import { Roles } from '../enum/Roles'
import { returnConnection } from '../database/config';
import { Module } from '../database/models/Modules'

export async function permission (user: any, path: string): Promise<boolean> {
    console.log('aqui',path)
    if(user.role !== Roles.ADMIN) {
        return await permissionUser(user, path)
    } 
    return true
}

async function permissionUser (user: any, path: string) : Promise<boolean> {
    const connection = await returnConnection();
    try {
        const res = await connection.mongoManager.find(Module, { where: { user_id: user.user_id } });
        connection.close();
        const exist = res.filter((value: any) => value.path === path);
        if(exist.length) return true
        return false
    } catch (error) {
        connection.close();
        return false
    }
}



