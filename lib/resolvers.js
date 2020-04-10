'use strict'

const mutations = require('./mutations')
const queires = require('./queries')
const types = require('./types')
// Config Resolvers
module.exports = {
  Query: queires,
  Mutation: mutations,
  ...types
}