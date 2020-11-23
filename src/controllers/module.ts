import { Request, Response } from 'express'
import { returnConnection } from '../database/config'
import { Module } from '../database/models/Modules'

export async function createModule(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection();
    try {
        const { path,  user_id } = req.body
        if(!path && !user_id) return res.status(404).json({message: "informe um path e o user_id"});
    
        const module = new Module;
        module.path = path;
        module.user_id = user_id;

        const db_user: Module = await connection.mongoManager.save(module);
        connection.close();

        return res.status(201).json(db_user);
    } catch (error) {
        console.log('createModule::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
}

export async function getModuleByUser(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection();
    try {
        const { user_id } = req.query
        const db_user: any = await connection.mongoManager.find(Module, { where: { user_id } });
        connection.close();
        return res.status(200).json(db_user)
    } catch (error) {
        console.log('getModuleByUser::error ', error);
        connection.close();
        return res.status(500).send(error)
    }
}

export async function deleteModule(req: Request, res: Response): Promise<Response> {
    const connection = await returnConnection()
    try {
        const { user_id, path } = req.body
        if(!user_id && !path ) return res.status(404).json({message: "informe um path e o user_id"});
        const db_user: any = await connection.mongoManager.findOne(Module, { where: { user_id, path  } });
        await connection.mongoManager.delete(Module, db_user);
        connection.close()
        return res.status(200).json({message: "usuário deletado"})
    } catch (error) {
        console.log('deleteUser::error ', error)
        connection.close()
        return res.status(500).send(error)
    }
}