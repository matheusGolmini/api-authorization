import configEnv from './src/config'

const configDB = configEnv().db_postgres

module.exports = {
  type: 'mongodb',
  url: configDB.url,
  useUnifiedTopology: true,
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