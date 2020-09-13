import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { getRepository } from 'typeorm'
import { createModuleUser } from '../service/db'
import User from '../database/models/User'
import UserModule from '../database/models/UserModule'


export async function createUser(req: Request, res: Response): Promise<Response> {
    const {user, module} = req.body
    user.password = bcrypt.hashSync(user.password, 10)
    const instanceRepo = getRepository('user')

    const result = await instanceRepo.save(user)
    const modules = await createModuleUser(module, result.id)
    return res.status(200).json({...result, modules})
}


export async function getUser(req: Request, res: Response): Promise<Response> {
    const instanceRepo = getRepository('user')
    const result = await instanceRepo.find()
    return res.status(200).json(result)
}

export async function getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const instanceRepo = getRepository('user')
    const result = await instanceRepo.find({ where: { id } })
    return res.status(200).json(result)
}

export async function getUserByCompany(req: Request, res: Response): Promise<Response> {
    const { company } = req.params
    const instanceRepo = getRepository('user')
    const result = await instanceRepo.find({ where: { company } })
    return res.status(200).json(result)
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const userReq = req.body

    const repo = getRepository('user')
    const result: any = await repo.findOne({
        id
    })
    if (!result) {
        return res.status(404).json({
            message: 'user not found'
        })
    }
    userReq.password = bcrypt.hashSync(userReq.password, 10)
    userReq.id = id
    const sav = await repo.save(userReq)
    if (sav) {
        return res.status(200).json(sav)
    }
    return res.status(404).json({
        message: 'user not found'
    })
}

export async function addModuleByUser(req: Request, res: Response): Promise<Response> {
    const { modules } = req.body

    if(!modules.length) return res.status(404).json({ message: 'invalid params' })
    const id = modules[0].userId
    const instanceRepoUser = getRepository('user')
    const resultUser: User | unknown = await instanceRepoUser.findOne({ where: { id } })

    if (!resultUser) {
        return res.status(404).json({
            message: 'user not found'
        })
    }

    const instanceRepoUserModule = getRepository('user_module')
    const sav = await instanceRepoUserModule.save(modules)
    return res.status(200).json(sav)
}

export async function deleteModuleByUser(req: Request, res: Response): Promise<Response> {
    const { modules } = req.body

    if(!modules.length) return res.status(404).json({ message: 'invalid params' })

    const instanceRepoUserModule = getRepository('user_module')
    try {
        await instanceRepoUserModule.delete(modules)
        return res.status(200).json({message: "deleted"})
    } catch (error) {
        return res.status(404).json({ message: 'it was not possible to delete' })
    }
}

export async function getModuleByUser(req: Request, res: Response): Promise<Response>{
    const { userId } = req.params

    const instanceRepoUserModule = getRepository('user_module')
    try {
        const modules: UserModule[] | unknown = await instanceRepoUserModule.find({where: { userId }})
        if(!!modules) {
            return res.status(200).json(modules)
        }
        return res.status(404).json({message: "The user has no modules"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({err: error})
    }
}

export async function getinfoCompany(req: Request, res: Response) {
   const { basicPath, path } = req.body
   return res.status(200).json({ message: `has permission to access the url: ${basicPath}${path}`})
}