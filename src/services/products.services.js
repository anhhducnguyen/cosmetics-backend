const db = require('../config/database');
const groupProducts = require('../utils/groupProducts');

const queryProducts = async (id = null) => {
    let query = db('products as p')
        .leftJoin('productImages as pi', 'p.id', 'pi.productID')
        .leftJoin('discounts as d', 'p.id', 'd.productID')
        .select(
            'p.*',
            'pi.imageUrl',
            'd.startDate',
            'd.endDate',
            db.raw('COALESCE(d.discountPercentage, 0) AS discountPercentage'),
            db.raw('ROUND(p.price * (1 - COALESCE(d.discountPercentage, 0) / 100), 0) AS discountedPrice')
        );

    if (id) {
        query = query.where('p.id', id);
    }

    return await query;
};

class ProductService {
    // static async getAll() {
    //     const products = await queryProducts();
    //     return groupProducts(products);
    // }  
    static async getAll({
        sortBy = 'id',
        sortOrder = 'asc',
        page = 1,
        limit = 10,
        minPrice,
        maxPrice
    } = {}) {
        // Biểu thức giá sau giảm
        const discountedPriceExpr = 'ROUND(p.price * (1 - COALESCE(d.discountPercentage, 0) / 100), 0)';
    
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        minPrice = minPrice !== undefined ? parseFloat(minPrice) : undefined;
        maxPrice = maxPrice !== undefined ? parseFloat(maxPrice) : undefined;
    
        const offset = (page - 1) * limit;
    
        // Query chính (không nhóm sản phẩm)
        let query = db('products as p')
            .leftJoin('productImages as pi', 'p.id', 'pi.productID')
            .leftJoin('discounts as d', 'p.id', 'd.productID')
            .select(
                'p.id',
                'p.productName',
                'p.productDescription',
                'p.productVendor',
                'p.price',
                'pi.imageUrl',
                'd.startDate',
                'd.endDate',
                db.raw('COALESCE(d.discountPercentage, 0) AS discountPercentage'),
                db.raw(`${discountedPriceExpr} AS discountedPrice`)
            );
    
        // Lọc theo giá sau giảm
        if (minPrice !== undefined && maxPrice !== undefined) {
            query.whereRaw(`${discountedPriceExpr} BETWEEN ? AND ?`, [minPrice, maxPrice]);
        } else if (minPrice !== undefined) {
            query.whereRaw(`${discountedPriceExpr} >= ?`, [minPrice]);
        } else if (maxPrice !== undefined) {
            query.whereRaw(`${discountedPriceExpr} <= ?`, [maxPrice]);
        }
    
        const validSortColumns = ['id', 'productName', 'price', 'discountedPrice'];
        if (sortBy === 'discountedPrice') {
            query.orderByRaw(`${discountedPriceExpr} ${sortOrder}`);
        } else if (validSortColumns.includes(sortBy)) {
            // Nếu sortBy là productName, phải dùng alias 'p.productName'
            query.orderBy(`p.${sortBy}`, sortOrder);  // 'p' là alias của bảng products
        } else {
            query.orderBy('p.id', 'desc');
        }
        
        
        console.log(query.toString());
        query.limit(limit * 2).offset(offset); // Lấy nhiều hơn một chút để có đủ sản phẩm sau khi nhóm
``
        // Truy vấn dữ liệu
        const products = await query;
    
        // Nhóm sản phẩm
        const groupedProducts = groupProducts(products);
        // Truy vấn đếm số sản phẩm duy nhất
        let countQuery = db('products as p')
            .leftJoin('discounts as d', 'p.id', 'd.productID')
            .modify((qb) => {
                if (minPrice !== undefined && maxPrice !== undefined) {
                    qb.whereRaw(`${discountedPriceExpr} BETWEEN ? AND ?`, [minPrice, maxPrice]);
                } else if (minPrice !== undefined) {
                    qb.whereRaw(`${discountedPriceExpr} >= ?`, [minPrice]);
                } else if (maxPrice !== undefined) {
                    qb.whereRaw(`${discountedPriceExpr} <= ?`, [maxPrice]);
                }
            })
            .countDistinct('p.id as count');
    
        const [{ count }] = await countQuery;
    
        return {
            products: groupedProducts.slice(0, limit), // Lấy đúng số lượng sản phẩm sau khi nhóm
            pagination: {
                total: Number(count),
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }
    
    static async getById(id) {
        const product = await queryProducts(id);
        const grouped = groupProducts(product);
        return grouped.length > 0 ? grouped[0] : null;
    }

    static async create({ 
        productName, 
        productLine, 
        productVendor, 
        productDescription, 
        quantityInstock, 
        price,
        images = []
    }) {
        return await db.transaction(async trx => {
            const [productId] = await trx("products").insert({
                productName,
                productLine,
                productVendor,
                productDescription,
                quantityInstock,
                price
            });
    
            if (images.length > 0) {
                const imageData = images.map(name => ({
                    productID: productId,
                    imageUrl: name
                }));
                await trx("productImages").insert(imageData);
            }
    
            return { productId };
        });
    }

    static async update({
        id,
        productName, 
        productLine, 
        productVendor, 
        productDescription, 
        quantityInstock, 
        price 
    }) {
        return db("products")
            .update({
                id,
                productName, 
                productLine, 
                productVendor, 
                productDescription, 
                quantityInstock, 
                price 
            })
            .where("id", id);
    }

    static async delete(id) {
        return db("products").delete().where("id", id);
    }
}

module.exports = ProductService;

















