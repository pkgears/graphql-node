'use strict'

const { graphql, buildSchema } = require('graphql')

//Schema
const schema = buildSchema(`
  type Query{
    hello: String,
    saludo: String
  }
`)

// Run Query Hello
graphql(schema, '{ hello }').then((data) => {
  console.log(data)
})