//Requisição do arquivo .env
require('dotenv').config()

//Requisição do módulo express dentro da pasta instalada (importação)
const express = require("express")

//Requisição do módulo mongoose dentro da pasta instalada (importação para poder usar o banco MongoDB)

const mongoose = require('mongoose')


//Utilizando o express como função dentro de uma constante para inicializar
const app = express()

//Ler JSON com middlewares

app.use(express.urlencoded({
    extended: true,
}),
)

app.use(express.json())

//Rotas da API para enviar dados
const personRoutes = require("./routes/personRoutes")

app.use("/person", personRoutes)



// Criando uma rota inicial /endpoint para receber uma mensagem JSON em http://localhost:3000/
app.get('/', (req, res) =>{

    res.json({message: 'OI EXPRESS'})
})


const DB_USER = process.env.DB_USER
const DB_PASSW = encodeURIComponent(process.env.DB_PASSW)

//Conectando ao servidor do MongoDB
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSW}@apicluster.6qf2zt1.mongodb.net/?retryWrites=true&w=majority`,
    ).then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(5500)
    })
    .catch((err) => console.log(err))

//Disponibilizando o express na porta 3000 (onde será escutada)

app.listen(3000)