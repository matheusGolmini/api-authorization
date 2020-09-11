import { Router } from 'express'
import { auth } from '../controllers/auth'
import checkComapany from '../middleware/company'
import * as Controller from '../controllers'

const router = Router()

router.post('/user', Controller.createUser)

//Company
router.post('/company', checkComapany, Controller.createCompany)
router.post('/module', Controller.createModule)

//Default
router.post('/auth', auth)

export default router