import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'reflect-metadata'
import './database/config'
import jwt from './middleware/jwt'
import routers from './routers'

const app = express()

const port = process.env.SERVER_PORT || 3000

app.use(morgan('dev'))
// app.use(jwt)
app.use(bodyParser.json())
app.use(routers)


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})