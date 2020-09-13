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

export async function getCompanyById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const instanceRepo = getRepository('company')
    const result = await instanceRepo.find({ where: { id } })
    return res.status(200).json(result)
}

export async function GetCompany(req: Request, res: Response): Promise<Response> {
    const instanceRepo = getRepository('company')
    const result = await instanceRepo.find()
    return res.status(200).json(result)
}

export async function updateCompany(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const companyReq = req.body

    const repo = getRepository('company')
    const result: any = await repo.findOne({
        id
    })
    if (!result) {
        return res.status(404).json({
            message: 'company not found'
        })
    }
    companyReq.password = bcrypt.hashSync(companyReq.password, 10)
    companyReq.id = id
    const sav = await repo.save(companyReq)
    if (sav) {
        return res.status(200).json(sav)
    }
    return res.status(404).json({
        message: 'company not found'
    })
}

