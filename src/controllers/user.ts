import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { Users } from '../database/models/User'
import { returnConnection } from '../database/config'


export async function createUser(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const {email, password, role} = req.body
        const passwordCryp = bcrypt.hashSync(password, 10)
        const user = new Users()
        user.email = email;
        user.password = passwordCryp;
        user.role = role;
    
        const db_user: Users = await connection.mongoManager.save(user);
        connection.close()
        return res.status(201).json(db_user)
    } catch (error) {
        console.log('createUser::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
   
}

export async function getUserByEmail(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const {email} = req.query
        if(!email) return res.status(404).json({message: "informe um email"});
        
        const db_user: any = await connection.mongoManager.findOne(Users, { where: { email } });
        connection.close()
        return res.status(200).json(db_user)
    } catch (error) {
        console.log('getUserByEmail::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
   
}

export async function getUsersByRole(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const {role} = req.query
        if(!role) return res.status(404).json({message: "informe uma role"});
        //conn
        const connection = await returnConnection()
        const db_user: any = await connection.mongoManager.find(Users, { where: { role } });
        connection.close()
        return res.status(200).json(db_user)
    } catch (error) {
        console.log('getUsersByRole::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
   
}

export async function updatePasswordUser(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const { email, password } = req.body
        if(!password && !email) return res.status(404).json({message: "informe um email e o nova paramteros do senha"});
        const db_user: any = await connection.mongoManager.findOne(Users, { where: { email } });

        db_user.password = bcrypt.hashSync(password, 10);
        await connection.mongoManager.save(Users, db_user)
        connection.close()
        return res.status(200).json(db_user)
    } catch (error) {
        console.log('createUser::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
   
}

export async function updateRoleUser(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const { email, role } = req.body
        if(!email && !role) return res.status(404).json({message: "informe um emaile a nova role"});
   
        const db_user: any = await connection.mongoManager.findOne(Users, { where: { email } });
        db_user.role = role;
        await connection.mongoManager.save(Users, db_user)
        connection.close()
        return res.status(201).json(db_user)
    } catch (error) {
        console.log('updateRoleUser::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const { email } = req.body
        if(!email ) return res.status(404).json({message: "informe um email"});
        const db_user: any = await connection.mongoManager.findOne(Users, { where: { email } });
        await connection.mongoManager.delete(Users, db_user);
        connection.close()
        return res.status(201).json({message: "usuário deletado"})
    } catch (error) {
        console.log('deleteUser::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
}

// export async function getUser(req: Request, res: Response): Promise<Response> {
//     const instanceRepo = getRepository('user')
//     const result = await instanceRepo.find()
//     return res.status(200).json(result)
// }

// export async function getUserById(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params
//     const instanceRepo = getRepository('user')
//     const result = await instanceRepo.find({ where: { id } })
//     return res.status(200).json(result)
// }

// export async function getUserByCompany(req: Request, res: Response): Promise<Response> {
//     const { company } = req.params
//     const instanceRepo = getRepository('user')
//     const result = await instanceRepo.find({ where: { company } })
//     return res.status(200).json(result)
// }

// export async function updateUser(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params
//     const userReq = req.body

//     const repo = getRepository('user')
//     const result: any = await repo.findOne({
//         id
//     })
//     if (!result) {
//         return res.status(404).json({
//             message: 'user not found'
//         })
//     }
//     userReq.password = bcrypt.hashSync(userReq.password, 10)
//     userReq.id = id
//     const sav = await repo.save(userReq)
//     if (sav) {
//         return res.status(200).json(sav)
//     }
//     return res.status(404).json({
//         message: 'user not found'
//     })
// }

// export async function addModuleByUser(req: Request, res: Response): Promise<Response> {
//     const { modules } = req.body

//     if(!modules.length) return res.status(404).json({ message: 'invalid params' })
//     const id = modules[0].userId
//     const instanceRepoUser = getRepository('user')
//     const resultUser: User | unknown = await instanceRepoUser.findOne({ where: { id } })

//     if (!resultUser) {
//         return res.status(404).json({
//             message: 'user not found'
//         })
//     }

//     const instanceRepoUserModule = getRepository('user_module')
//     const sav = await instanceRepoUserModule.save(modules)
//     return res.status(200).json(sav)
// }

// export async function deleteModuleByUser(req: Request, res: Response): Promise<Response> {
//     const { modules } = req.body

//     if(!modules.length) return res.status(404).json({ message: 'invalid params' })

//     const instanceRepoUserModule = getRepository('user_module')
//     try {
//         await instanceRepoUserModule.delete(modules)
//         return res.status(200).json({message: "deleted"})
//     } catch (error) {
//         return res.status(404).json({ message: 'it was not possible to delete' })
//     }
// }

// export async function getModuleByUser(req: Request, res: Response): Promise<Response>{
//     const { userId } = req.params

//     const instanceRepoUserModule = getRepository('user_module')
//     try {
//         const modules: UserModule[] | unknown = await instanceRepoUserModule.find({where: { userId }})
//         if(!!modules) {
//             return res.status(200).json(modules)
//         }
//         return res.status(404).json({message: "The user has no modules"})
//     } catch (error) {
//         console.log(error)
//         return res.status(404).json({err: error})
//     }
// }

// export async function userCommunicationCompany(req: Request, res: Response) {
//    const { basicPath, path } = req.body
//    return res.status(200).json({ message: `has permission to access the url: ${basicPath}${path}`})
// }