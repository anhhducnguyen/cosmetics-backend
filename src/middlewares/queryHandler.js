module.exports = function queryHandler(req, res, next) {
    const {
        page = 1,
        limit = 10,
        sortBy = 'id',
        sortOrder = 'asc',
        minPrice=4500,
        maxPrice=500000,
        search
    } = req.query;    

    // Đảm bảo các giá trị đều được chuyển thành kiểu dữ liệu phù hợp
    req.query.page = parseInt(page);
    req.query.limit = parseInt(limit);
    req.query.sortBy = sortBy;
    req.query.sortOrder = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';
    req.query.minPrice = minPrice ? parseFloat(minPrice) : null;
    req.query.maxPrice = maxPrice ? parseFloat(maxPrice) : null;
    req.query.search = search;

    next();
};
