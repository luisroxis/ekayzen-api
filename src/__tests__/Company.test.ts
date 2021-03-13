import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'
import { app } from '../app'

describe("Companies", ()=> {
  beforeAll(async ()=> {
    const testConnection = await createConnection({
      name: 'test',      
      type: 'sqlite',
      database: './src/database/db/database.test.sqlite',
      entities: ['./src/database/entities/*.ts'],
      migrations: ['./src/database/migrations/*.ts'],
      cli: {
        migrationsDir: './src/database/migrations',
        entitiesDir: './src/database/entities'
      }
    });

    await testConnection.runMigrations()
  })

  afterAll(async ()=> {
    const connection = getConnection();
    await connection.dropDatabase()
    await connection.close()
  })

  it("Should be able to create a new company", async ()=>{
    const response = await request(app).post('/companies')
    .send({
      name: "FulanoTech",  
      email:"contato@fulano.tech", 
      telephone1:"1144444444", 
      cnpj:"61527612000121",
      size:1,
      employees:1, 
      nameResp:"Fulano da Silva",
      emailResp:"fulano@fulano.tech",  
      telResp:"11999999999",
      zipCode:"02374100",
      address:"Rua Professor Pádua Fleury, 0001",
      district:"Vila Irmãos Arnoni",
      city:"São Paulo",
      state:"SP",
    });
    expect(response.status).toBe(201)
  })

  it("Should not be able to create a company that already exists", async ()=> {
    const response = await request(app).post("/companies")
    .send({
      name: "FulanoTech",  
      email:"contato@fulano.tech", 
      telephone1:"1144444444", 
      cnpj:"61527612000121",
      size:1,
      employees:1, 
      nameResp:"Fulano da Silva",
      emailResp:"fulano@fulano.tech",  
      telResp:"11999999999",
      zipCode:"02374100",
      address:"Rua Professor Pádua Fleury, 0001",
      district:"Vila Irmãos Arnoni",
      city:"São Paulo",
      state:"SP"
    })    
    expect(response.status).toBe(400)
  })
})
