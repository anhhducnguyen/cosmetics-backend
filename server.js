const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/products.routes');
const discountRoutes = require('./src/routes/discounts.routes');
const productLineRoutes = require('./src/routes/productlines.routes');
const orderRoutes = require('./src/routes/orders.routes');
const reviewRoutes = require('./src/routes/reviews.routes');
const cartRoutes = require('./src/routes/carts.routes');
const orderdetailRoutes = require('./src/routes/orderdetails.routes');
const productImageRoutes = require('./src/routes/productimages.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views')); 
app.use(express.static("./src/public"));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})