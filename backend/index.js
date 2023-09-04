const express = require("express");
const mysql = require("mysql2/promise");

const port = 3000
const app = express();

const conection = mysql.createPool({
    host: 'localhost',
    port: "3306",
    database: "testePessoa",
    user:"root",
    password: ""
})

app.use(express.json());

app.get('/pessoa', async (req, res) => {
    const consulta = await getAllPeople()
    return res.status(200).json(consulta)
});

const getAllPeople = async () => {
    const [query] = await conection.execute('select * from pessoa')
    return query
};




app.listen(port,() => console.log(`Estou te ouvindo pela porta ${port}`));

