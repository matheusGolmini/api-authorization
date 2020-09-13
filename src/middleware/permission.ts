import Module from "../database/models/Module"
import { Request } from "express"
import { saveLogUser } from "../service/db"

export function permission (req: Request): boolean {
    if(!!req.headers.authorizedmodules) {
        return permissionUser(JSON.parse(String(req.headers.authorizedmodules)), String(req.headers.path), String(req.headers.id))
    } 
    return true
}



export function permissionUser (modules: any, path: string, userId: string  ): boolean {
    let permission: boolean = false
    const [module] = modules.filter((value: Module) => { 
        if(value.path === path) {
           permission = true
           return value 
        }
    })

    if(module) {
        saveLogUser({
            isValue: permission,
            module: module.id,
            user: userId, 
        })
    } 
    return permission
}



