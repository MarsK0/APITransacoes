import express from 'express'
import cors from 'cors'
import routes from './src/routes/routes'

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333, () => {
  console.log("Servidor rodando no porta 3333...")
})