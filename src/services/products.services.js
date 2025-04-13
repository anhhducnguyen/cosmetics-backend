const db = require('../config/database');
const groupProducts = require('../middlewares/groupProducts');

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
    static async getAll() {
        const products = await queryProducts();
        return groupProducts(products);
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





















// static async getAll(page = 1, limit = 10) {
    //     const offset = (page - 1) * limit;
    
    //     const productIds = await db('products')
    //         .select('id')
    //         .orderBy('id')
    //         .limit(limit)
    //         .offset(offset);
    
    //     if (productIds.length === 0) return { products: [], pagination: { page, limit, totalCount: 0, totalPages: 0 } };
    
    //     const products = await db('products as p')
    //         .whereIn('p.id', productIds.map(p => p.id))
    //         .join('productImages as pi', 'p.id', 'pi.productID')
    //         .leftJoin('discounts as d', 'p.id', 'd.productID')
    //         .select(
    //             'p.*',
    //             'pi.imageUrl',
    //             'd.startDate',
    //             'd.endDate',
    //             db.raw('COALESCE(d.discountPercentage, 0) AS discountPercentage'),
    //             db.raw('ROUND(p.price * (1 - COALESCE(d.discountPercentage, 0) / 100), 0) AS discountedPrice')
    //         );
    
    //     const total = await db('products').count('id as count').first();
    //     const totalCount = parseInt(total.count);
    //     const totalPages = Math.ceil(totalCount / limit);
    
    //     const groupedProducts = _(products)
    //         .groupBy('id')
    //         .map((items) => {
    //             const firstItem = items[0];
    //             return {
    //                 id: firstItem.id,
    //                 productName: firstItem.productName,
    //                 productLine: firstItem.productLine,
    //                 productVendor: firstItem.productVendor,
    //                 productDescription: firstItem.productDescription,
    //                 quantityInstock: firstItem.quantityInstock,
    //                 price: Number(firstItem.price),
    //                 createdAt: firstItem.createdAt,
    //                 updatedAt: firstItem.updatedAt,
    //                 startDate: firstItem.startDate,
    //                 endDate: firstItem.endDate,
    //                 discountPercentage: Number(firstItem.discountPercentage),
    //                 discountedPrice: Number(firstItem.discountedPrice),
    //                 imageUrls: items.map((item) => item.imageUrl)
    //             };
    //         })
    //         .value();
    
    //     return {
    //         products: groupedProducts,
    //         pagination: {
    //             page,
    //             limit,
    //             totalCount,
    //             totalPages
    //         }
    //     };
    // }
