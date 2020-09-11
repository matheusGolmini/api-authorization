import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { parseAuthorizationHeaders, generateJwt } from '../helpers/jwt-helper'
import { getByEmail } from '../service/db'


export async function auth(req: Request, res: Response): Promise<Response> {
  const authorization = req.headers.authorization
  const { table } = req.body

  if (!!authorization && !!table) {
    const { user, pwd } = parseAuthorizationHeaders(authorization)
    const people: any = await getByEmail(user, table)
    if (people) {
        if (bcrypt.compareSync(pwd, people.password)) {
            people.jwt = generateJwt(people.id)
            return res.status(200).json(people)
        }
    }
  }
  return res.status(404).json({message: "deu ruim"})
}

