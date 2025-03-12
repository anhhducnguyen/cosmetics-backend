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
