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

export async function GetCompanyById(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const instanceRepo = getRepository('company')
    const result = await instanceRepo.find({ where: { id } })
    return res.status(200).json(result)
}

export async function GetCompany(req: Request, res: Response): Promise<Response> {
    const instanceRepo = getRepository('company')
    const result = await instanceRepo.find()
    return res.status(200).json(result)
}

