//Chamando apenas a função router do express
const router = require("express").Router()

const Person = require('../models/Person')

//Criação dos usuários
router.post('/', async (req, res)=> {

    const {name, salary, approved} = req.body

    //Validação dos dados enviados

    if(!name){

        res.status(422).json({error: "O nome é obrigatório!"})
        return
    }

    const person = {

        name,
        salary,
        approved
    }
    
    try{

        //Criando dados no banco MongoDB
        await Person.create(person)

        res.status(201).json({message : "Pessoa inserida no sistema com sucesso!"})

    }catch(error){

        res.status(500).json({error: error})
    }

})


//Leitura dos dados

router.get('/', async (req, res) =>{

    try{

        //Todos os dados sejam retornados por meio do find()
        const people = await Person.find()

        res.status(200).json(people)
        
    }catch(error){

        res.status(500).json({error: error})
    }
})

//Leitura dinâmica (filtro pelo ID)
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try{
        
        //findOne() encontra apenas um resultado
        const person = await Person.findOne({_id: id})

        //O que acontece se o ID não for encontrado

        if(!person){

            res.status(422).json({message: "O usuário não foi encontrado pelo ID"})
            return
        }

        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }
} )


//Atualização de dados por meio do Patch (atualização de campos específicos, em vez de PUT)

router.patch('/:id', async (req, res) =>{

    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {

        name,
        salary,
        approved,
    }

    try{

        const updatedPerson = await Person.updateOne({_id: id}, person)

        //Validação do usuário para saber se ele existe, para poder atualizar
        if(updatedPerson.matchedCount === 0){

            res.status(422).json({message: "O usuário não foi encontrado"})
            return
        }


        res.status(200).json(person)

    }catch(error){

        res.status(500).json({error: error})
    }
})

//Deletar dados

router.delete("/:id", async (req, res) =>{

    const id = req.params.id
    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message: "O usuário não foi encontrado!"})
        return
    }

    try{

        //Remoção de um usuário só por meio do deleteOne()
        await Person.deleteOne({_id: id})

        res.status(200).json({message: "O usuário foi removido com sucesso!"})
    }catch(error){

        res.status(500).json({error: error})
    }

})


//Exportando o router para o index.js

module.exports = router