import configEnv from './src/config'

const configDB = configEnv().db_postgres

module.exports = {
  type: 'postgres',
  host: configDB.host,
  port: Number(configDB.port),
  username: configDB.username,
  password: configDB.password,
  database: configDB.database,
  entities: [
    'src/database/models/**/*.ts'
  ],
  migrations: [
    'src/database/migrations/**/*.ts'
  ],
  cli: {
    migrationsDir: 'src/database/migrations/',
    entitiesDir: 'src/database/models'
  }
}