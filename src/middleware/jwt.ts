import { verifyJwt } from '../helpers/jwt-helper'
import { Request, Response, NextFunction } from 'express'
import { permission } from './permission'

interface CheckJwt {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | '*'
}

const excludedPaths: CheckJwt[] = [
  {
    path: '/auth',
    method: '*'
  },
  {
    path: '/company',
    method: 'POST'
  }
]

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path, method } = req

  const isExcluded = excludedPaths.filter((value: CheckJwt) => {
    if(value.path === path) {
      if(value.method === method || value.method === '*') return value
    }
  })

  if (isExcluded.length) return next()
  const jwt = req.headers.jwt

  if (!jwt) return res.status(401).json({ message: 'Informe um jwt' })
  try {
    const result = verifyJwt(String(req.headers.jwt))
    if (!result) return res.status(401).json({ message: 'Invalid Token' })
    if(!permission(req)) return res.status(402).json({ message: 'Does not have permission' }) 
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}

export default checkJwt