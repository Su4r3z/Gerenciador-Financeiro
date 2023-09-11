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
app.use(express.urlencoded({extended: false}))

app.get('/pessoa', async (req, res) => {
    const consulta = await getAllPeople()
    return res.status(200).json(consulta)
});

app.get('/pessoa/:id', async (req,res) => {
    const {id} = req.params
    const {query} = await conection.execute("select * from pessoa where id = ? ", [id]);
    if (query.length===0) return res.status(400).json({mensagem: "nenhuma pessoa encontrada"});
    return res.status(200).json(query)
})
;

app.post('/pessoa', async (req,res) => {
    const {nome,email} = req.body
    const {query} = await conection.execute("insert into pessoa (nome, email) values (?, ?)", [nome, email]);
    return res.status(201).json(query)
});

app.put('/pessoa/:id', async (req,res) => {
    const {id} = req.params
    const {nome, email, telefone} = req.body
    const {query} = await conection.execute("update pessoa set nome = ?, email = ?, telefone = ? where id = ?", [nome, email, telefone, id]);
    if (query.affectedRows===0) return res.status(400).json({mensagem: "nenhuma pessoa encontrada"});
    return res.status(200).json(query)


});

app.delete('/pessoa/:id', async (req,res) => {
    const {id} = req.params
    const {query} = await conection.execute

});

const getAllPeople = async () => {
    const [query] = await conection.execute('select * from pessoa')
    return query
};


app.listen(port,() => console.log(`Estou te ouvindo pela porta ${port}`));

