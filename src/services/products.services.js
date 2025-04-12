const db = require('../config/database');
const _ = require('lodash');

class ProductService {
    static async getAll() {
        const products = await db('products as p')
            .join('productImages as pi', 'p.id', 'pi.productID')
            .leftJoin('discounts as d', 'p.id', 'd.productID')
            .select(
                'p.*',
                'pi.imageUrl',
                'd.startDate',
                'd.endDate',
                db.raw('COALESCE(d.discountPercentage, 0) AS discountPercentage'),
                db.raw('ROUND(p.price * (1 - COALESCE(d.discountPercentage, 0) / 100), 0) AS discountedPrice')
            );
    
        const groupedProducts = _(products)
        .groupBy('id')
        .map((items) => {
            const firstItem = items[0];
            return {
                id: firstItem.id,
                productName: firstItem.productName,
                productLine: firstItem.productLine,
                productVendor: firstItem.productVendor,
                productDescription: firstItem.productDescription,
                quantityInstock: firstItem.quantityInstock,
                price: Number(firstItem.price), 
                createdAt: firstItem.createdAt,
                updatedAt: firstItem.updatedAt,
                startDate: firstItem.startDate,
                endDate: firstItem.endDate,
                discountPercentage: Number(firstItem.discountPercentage), 
                discountedPrice: Number(firstItem.discountedPrice), 
                imageUrls: items.map((item) => item.imageUrl)
            };
        })
        .value();
        return groupedProducts;
    }

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
    
    
    static async getById(id) {
        return db("products").where("id", id).select("*");
    }

    static async create(data) {
        return db("products").insert(data)
    }

    static async update(id, data) {
        return db("products").update(data).where("id", id);
    }

    static async delete(id) {
        return db("products").delete().where("id", id);
    }
    
}

module.exports = ProductService;
