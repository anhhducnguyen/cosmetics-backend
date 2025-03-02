const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const userRoutes = require('../src/routes/userRoutes');

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API!'
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})