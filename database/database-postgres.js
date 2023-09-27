import { randomUUID } from 'node:crypto';
import { sql } from './db-config.js';
 
export class DatabasePostgres {
  async list(search) {
    let patients

    if(search) {
      patients = await sql`SELECT * FROM patients WHERE status ILIKE ${'%' + search + '%'}`;
    } else {
      patients = await sql`SELECT * FROM patients`;
    }

    return patients
  }

  async create(patient) {
    const patientID = randomUUID()
    const { name, email, phone, doctorName, date, status } = patient
    
    await sql`insert into patients (id, name, email, phone, doctorName, date, status) VALUES (${patientID}, ${name}, ${email}, ${phone}, ${doctorName}, ${date}, ${status})`
  }

  async update(id, patient) {
    const { name, email, phone, doctorName, date, status } = patient
    await sql`update patients set name = ${name}, email = ${email}, phone = ${phone}, doctorName = ${doctorName}, date = ${date}, status = ${status} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`delete from patients where id = ${id}`
  }
}