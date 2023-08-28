const express = require("express");
const port = 3000
const app = express();


app.get('/', (req, res) => {
    res.send("Ta tudo funcionando")
});


app.listen(port,() => console.log(`Estou te ouvindo pela porta ${port}`));