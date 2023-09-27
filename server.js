import { fastify } from 'fastify'
import { DatabasePostgres } from './database/database-postgres.js'
 
const server = fastify()
const database = new DatabasePostgres()


server.post('/patients', async (request, reply) => {
  const { name, email, phone, doctorName, date, status } = request.body

  await database.create({
    name,
    email, 
    phone, 
    doctorName, 
    date, 
    status
  })

  return reply.status(201).send('Paciente criando com sucesso')
})

server.get('/patients', async (request, reply) => {
  const search = request.query.search

  const patients = await database.list(search)
  return patients
})

server.put('/patients/:id', async (request, reply) => {
  const patientId = request.params.id
  const { name, email, phone, doctorName, date, status } = request.body

  await database.update(patientId, {
    name,
    email, 
    phone, 
    doctorName, 
    date, 
    status
  })

  return reply.status(204).send()
})

server.delete('/patients/:id', async (request, reply) => {
  const patientId = request.params.id

  await database.delete(patientId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})