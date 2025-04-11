const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require("./src/config/passport");
// const session = require("express-session");
const sessionMiddleware = require('./src/config/session');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/products.routes');
const discountRoutes = require('./src/routes/discounts.routes');
const productLineRoutes = require('./src/routes/productlines.routes');
const orderRoutes = require('./src/routes/orders.routes');
const reviewRoutes = require('./src/routes/reviews.routes');
const cartRoutes = require('./src/routes/carts.routes');
const orderdetailRoutes = require('./src/routes/orderdetails.routes');
const productImageRoutes = require('./src/routes/productimages.routes');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/config/swagger-config");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views')); 
app.use(express.static("./src/public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(sessionMiddleware);
app.use('/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/discounts', discountRoutes);
app.use('/api/v1/productlines', productLineRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/orderdetails', orderdetailRoutes);
app.use('/api/v1/productimages', productImageRoutes);

app.get('/', (req, res) => {
    res.render('products', { title: 'Home', cssFileName: 'index' });
})
app.get('/admin', (req, res) => {
    res.sendFile('public/admin/index.html', { root:__dirname });
})
app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});
app.listen(port, () => {
console.log(`
Server running at http://localhost:${port}
Api docs available at http://localhost:${port}/api-docs
`)
})






















// const passport = require("./src/config/passport");
// const session = require("express-session");

// app.use(session({
//     secret: "your-secret-key",  // Chuỗi bí mật để mã hóa session
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//       secure: false, 
//       httpOnly: true,
//       // maxAge: 60 * 1000 // 1 phút
//       maxAge: 24 * 60 * 60 * 1000 // 1 ngày (24 giờ)
//     } 
// }));