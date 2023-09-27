import { sql } from './db-config.js'

// sql`DROP TABLE IF EXISTS patients`.then(() => {
//   console.log('tabela apagada')
// })

sql`
  CREATE TABLE patients (
    id            UUID PRIMARY KEY,
    name          TEXT,
    email         TEXT,
    phone         TEXT,
    doctorName    TEXT,
    date          TEXT,
    status        TEXT
  );
`.then(() => {
  console.log('Tabela Criada')
})


// comando para executar é o node create-table.js