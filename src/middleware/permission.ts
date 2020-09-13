import Module from "../database/models/Module"
import { Request } from "express"

export function permission (req: Request): boolean {
    if(!req.headers.authorizedmodules) return true
    return permissionUser(JSON.parse(String(req.headers.authorizedmodules)), String(req.headers.path))
}



export function permissionUser (modules: any, path: string  ): boolean {
    let permission: boolean = false
    modules.forEach((value: Module) => { 
        if(value.path === path) {
           permission = true 
        }
    })
    return permission
}

