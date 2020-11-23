import { Router } from 'express'
import * as Controller from '../controllers'
import checkUser  from '../middleware/user'

const router = Router()

router.post('/user', checkUser, Controller.createUser)
router.get('/user/email', Controller.getUserByEmail)
router.get('/users/role', Controller.getUsersByRole)
router.patch('/user/password', Controller.updatePasswordUser)
router.patch('/user/role', Controller.updateRoleUser)
router.delete('/user', Controller.deleteUser)
router.get('/test', (req, res) => {
    res.status(200).send({message: "Tem acesso"})
})


export default router