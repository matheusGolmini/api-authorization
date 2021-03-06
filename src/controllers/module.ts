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

export async function updateModule(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const moduleReq = req.body

    const repo = getRepository('module')
    const result: any = await repo.findOne({
        id
    })
    if (!result) return res.status(404).json({ message: 'module not found'})
    
    moduleReq.id = id
    const sav = await repo.save(moduleReq)

    if (!!sav) return res.status(200).json(sav)

    return res.status(404).json({
        message: 'module not found'
    })
}