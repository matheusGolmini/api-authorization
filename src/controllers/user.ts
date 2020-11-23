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