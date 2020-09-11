import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { getRepository } from 'typeorm'


export async function createUser(req: Request, res: Response): Promise<Response> {
    const {user, module} = req.body
    user.password = bcrypt.hashSync(user.password, 10)
    const instanceRepo = getRepository('user')

    const result = await instanceRepo.save(user)
    const modules = await createModuleUser(module, result.id)
    return res.status(200).json({...result, modules})
}


async function createModuleUser(module_id: any, user_id: string) {
    try {
        const instanceRepo = getRepository('user_module')
        module_id.forEach((element: any) => {
            element.userId = user_id
        });
        console.log(module_id)
        const result = await instanceRepo.save(module_id)
        return result
    } catch (error) {
        console.log(error)
    }
    
} 
