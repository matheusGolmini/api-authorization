import { Router } from 'express'
import { auth } from '../controllers/auth'
import checkComapany from '../middleware/company'
import * as Controller from '../controllers'

const router = Router()

//User
router.post('/user', Controller.createUser)
router.get('/user/:id', Controller.getUserById)
router.get('/user/company/:company', Controller.getUserByCompany)
router.get('/user', Controller.getUser)

//Company
router.post('/company', checkComapany, Controller.createCompany)
router.get('/company/:id', Controller.GetCompanyById)
router.get('/company', Controller.GetCompany)
//Module
router.post('/module', Controller.createModule)
router.get('/module/:company', Controller.getModuleByCompany)
router.get('/module', Controller.getModule)

//Default
router.post('/auth', auth)

export default router