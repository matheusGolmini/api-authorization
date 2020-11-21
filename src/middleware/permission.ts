import { Roles } from '../enum/Roles'

export function permission (user: any): boolean {
    if(user.role !== Roles.ADMIN) {
        return true
    } 
    return true
}



// export function permissionUser (modules: any, path: string, userId: string  ): boolean {
//     let permission: boolean = false
//     const [module] = modules.filter((value: Module) => { 
//         if(value.path === path) {
//            permission = true
//            return value 
//         }
//     })

//     if(module) {
//         saveLogUser({
//             module: module.id,
//             user: userId, 
//         })
//     } 
//     return permission
// }



