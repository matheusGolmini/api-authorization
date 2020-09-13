import { Router } from 'express'
import * as Controller from '../controllers'

const router = Router()

router.post('/user', Controller.createUser)
router.get('/user/communication/company', Controller.userCommunicationCompany)
router.get('/user/:id', Controller.getUserById)
router.get('/user/company/:company', Controller.getUserByCompany)
router.get('/user/module/:userId', Controller.getModuleByUser)
router.get('/user', Controller.getUser)
router.put('/user/:id', Controller.updateUser)
router.post('/user/module', Controller.addModuleByUser)
router.delete('/user/module', Controller.deleteModuleByUser)

export default router