import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { getRepository } from 'typeorm'


export async function createCompany(req: Request, res: Response): Promise<Response> {
    const company = req.body
    company.password = bcrypt.hashSync(company.password, 10)
    const instanceRepo = getRepository('company')
    const result = await instanceRepo.save(company)
    return res.status(200).json(result)
}

export async function createModule(req: Request, res: Response): Promise<Response> {
    const modules = req.body
    const instanceRepo = getRepository('module')
    const result = await instanceRepo.save(modules)
    return res.status(200).json(result)
}