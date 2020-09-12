import { Router } from 'express'
import { auth } from '../controllers/auth'
import checkComapany from '../middleware/company'
import * as Controller from '../controllers'

const router = Router()

router.post('/company', checkComapany, Controller.createCompany)
router.get('/company/:id', Controller.GetCompanyById)
router.get('/company', Controller.GetCompany)

export default router