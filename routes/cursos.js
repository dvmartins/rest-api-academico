const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const Curso = require('../models/curso')

router.get('/', async (req, res)=>{
    try {
        const cursos = await Curso.find()
        res.json(cursos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getCurso, (req, res)=>{
    res.json(res.curso)
})



router.post('/', async (req, res)=>{
    const curso = new Curso({
        userTitle: req.body.userTitle,
        userText: req.body.userText
       
    })

    try {
        const newCurso = await curso.save()
        res.status(201).json(newCurso)
    } catch (error) {
        res.status(400).json({message: error.message})

    }
})


router.patch('/:id', getCurso, async (req, res)=>{
    if(req.body.userTitle != null){
        res.curso.userTitle = req.body.userTitle
    }
    if(req.body.userText != null){
        res.curso.userText = req.body.userText
    }
    try {
        const updateCurso = await res.curso.save()
        res.json(updateCurso)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})


router.delete('/:id', getCurso, async (req, res)=>{
   try {
       await res.curso.remove()
       res.json({message: 'Curso was deleted'})
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})

async function getCurso(req, res, next){
   try {
       curso = await Curso.findById(req.params.id)
       if(curso == null){
            return res.status(404).json({message: 'curso not found!'})
       }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.curso = curso
    next()
}

module.exports = router