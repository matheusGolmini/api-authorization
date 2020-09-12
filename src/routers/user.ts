import { Router } from 'express'
import * as Controller from '../controllers'

const router = Router()

router.post('/user', Controller.createUser)
router.get('/user/:id', Controller.getUserById)
router.get('/user/company/:company', Controller.getUserByCompany)
router.get('/user', Controller.getUser)

export default router