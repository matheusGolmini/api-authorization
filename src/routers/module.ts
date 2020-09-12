import { Router } from 'express'
import * as Controller from '../controllers'

const router = Router()

router.post('/module', Controller.createModule)
router.get('/module/:company', Controller.getModuleByCompany)
router.get('/module', Controller.getModule)

export default router