import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export async function createModule(req: Request, res: Response): Promise<Response> {
    const modules = req.body
    const instanceRepo = getRepository('module')
    const result = await instanceRepo.save(modules)
    return res.status(200).json(result)
}

export async function getModuleByCompany(req: Request, res: Response): Promise<Response> {
    const { company } = req.params
    const instanceRepo = getRepository('module')
    const result = await instanceRepo.find({ where: { company } })
    return res.status(200).json(result)
}

export async function getModule(req: Request, res: Response): Promise<Response> {
    const instanceRepo = getRepository('module')
    const result = await instanceRepo.find()
    return res.status(200).json(result)
}