import { getRepository } from 'typeorm'

export async function getByEmail(email: string, table: string) {
    const repo = getRepository(table)
    const res = await repo.findOne({ email })
    return res
}

export async function createModuleUser(module_id: any, user_id: string) {
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