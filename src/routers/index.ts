import { Router } from 'express'
import { auth } from '../controllers/auth'
import userRouter from './user'
import moduleRouter from './module'

const router = Router()

//Default
router.post('/auth', auth)

//use
router.use(userRouter)
router.use(moduleRouter)

export default router