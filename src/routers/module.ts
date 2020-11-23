import { Router } from 'express'
import * as Controller from '../controllers'

const router = Router()

router.post('/module', Controller.createModule)
router.get('/module', Controller.getModuleByUser)
router.delete('/module', Controller.deleteModule)

export default router