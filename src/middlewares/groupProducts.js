const _ = require('lodash');

function groupProducts(products) {
    return _(products)
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
}

module.exports = groupProducts;
