import { Request, Response, NextFunction } from 'express'
import config from '../config'

const token = config().token_create_company
const checkComapany = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if(`Bearer ${token}` !== authorization) return res.status(402).json({message: "Não está autorizado"})
    next()
}

export default checkComapany