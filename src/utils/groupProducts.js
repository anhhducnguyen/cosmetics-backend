// const _ = require('lodash');

// function groupProducts(products) {
//     return _(products)
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
// }
const _ = require('lodash');

function groupProducts(products) {
    const groupedMap = _.groupBy(products, 'id');

    // Duyệt theo thứ tự xuất hiện ban đầu trong mảng products
    const seen = new Set();
    const result = [];

    for (const p of products) {
        if (!seen.has(p.id)) {
            const items = groupedMap[p.id];
            const firstItem = items[0];
            result.push({
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
            });
            seen.add(p.id);
        }
    }

    return result;
}


module.exports = groupProducts;
