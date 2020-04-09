'use strict'

const {MongoClient} = require('mongodb')
const {
  DB_HOST,
  DB_DATABASE,
} =  process.env

const mongoUrl = `mongodb://${DB_HOST}/${DB_DATABASE}`

let connection

async function connectDB() {
  if(connection) return connection
  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = client.db(DB_DATABASE)
  } catch (error) {
    console.error(`No se pudo conectar a mongo`, mongoUrl, error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB