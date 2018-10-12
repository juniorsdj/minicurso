const express = require('express')
const router = express.Router()
const authMid = require('./../mid/auth')
const Project = require('./../model/project')

router.use(authMid)

router.get('/:userId', async (req, resp) =>{
   try {
       const {userId} = req.params
       const projects = await Project.find({user: userId}).populate('user')
       return resp.send(projects)
   } catch (err) {
       return resp.status(400).send({error: 'error get projects'})
   }
})

router.get('/:userId/:projectId', async (req, resp) =>{
    try {
        const {userId, projectId} = req.params
        const project = await Project.findOne({user: userId, _id: projectId}).populate('user')
        resp.send(project)
    } catch (err) {
        resp.status(400).send({error: 'error get project'})        
    }
})


router.delete('/:userId/:projectId', async (req, resp) =>{
    try {
        const {userId, projectId} = req.params
        const project = await Project.findOneAndDelete({user: userId, _id: projectId})
        resp.send(project)
    } catch (err) {
        resp.status(400).send({error: 'error delete project'})        
    }
})

router.put('/:projectId', async (req, resp) =>{
    try {
        const {title, description } = req.body
        const { projectId} = req.params
        const project = await Project.findByIdAndUpdate(projectId, { 
            title,
            description,
        }, {new: true}).populate('user')

        resp.send(project)
    } catch (err) {
        resp.status(400).send({error: 'error updating project'})        
    }
})



router.post('/', async (req, resp) =>{
    try {
        const project = await Project.create({... req.body,user : req.userId })
        return resp.send({project})
    } catch (err) {
        resp.status(400).send({err: 'Error a new project'})
    }
})

module.exports = app => app.use('/project', router)