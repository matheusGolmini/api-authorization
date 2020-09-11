import dotenv from 'dotenv'

dotenv.config()

function getFromEnv(name: string): string {
  if (!process.env[name]) throw Error(`Required env ${name}`)
  return process.env[name] as string
}

export default function config() {
    return {
      db_postgres: {
        host: getFromEnv('DB_HOST'),
        port: getFromEnv('DB_PORT'),
        username: getFromEnv('DB_USERNAME'),
        database: getFromEnv('DB_DATABASE'),
        password: getFromEnv('DB_PASS')
      },
      jwt_secret: getFromEnv('JWT_SECRET'),
      token_create_company: getFromEnv('TOKEN_CREATE_COMPANY')
    }
}
