const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send(`<h1>CR SIMPLIFICANDO INFO LTDA</h1>`);
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);  
})