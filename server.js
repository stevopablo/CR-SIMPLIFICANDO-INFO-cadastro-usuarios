const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get("/", (req, res) => {
    res.status(200).send(`<h1>CR SIMPLIFICANDO INFO LTDA</h1>`);
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);  
})