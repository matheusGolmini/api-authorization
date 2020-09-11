import { getRepository } from 'typeorm'

export async function getByEmail(email: string, table: string) {
    const repo = getRepository(table)
    const res = await repo.findOne({ email })
    return res
}