import { Router } from 'express'
import { auth } from '../controllers/auth'
import userRouter from './user'
import moduleRouter from './user'
import companyRouter from './company'

const router = Router()

//Default
router.post('/auth', auth)

//use
router.use(userRouter)
router.use(moduleRouter)
router.use(companyRouter)

export default router