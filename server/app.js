const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const userRoutes = require('../src/routes/user.routes');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use('/api/v1/users', userRoutes);


app.get('/', (req, res) => {
    // res.json({
    //     message: 'Welcome to the API!'
    // })
    res.sendFile('public/index.html', { root:__dirname });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})