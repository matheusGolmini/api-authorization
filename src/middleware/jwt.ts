import { verifyJwt } from '../helpers/jwt-helper'
import { Request, Response, NextFunction } from 'express'

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req
  const excludedPaths = ['/auth', '/account', '/company']
  const isExcluded = !!excludedPaths.find((p) => {
    return p.startsWith(path)
  })

  if (isExcluded) return next()
  const jwt = req.headers.jwt

  if (!jwt) return res.status(401).json({ message: 'Tem que mandar o jwt mané' })
  try {
    const result = verifyJwt(String(req.headers.jwt))
    if (!result) return res.status(401).json({ message: 'Invalid Token' })

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}

export default checkJwt