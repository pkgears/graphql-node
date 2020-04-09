'use strict'
const connectDb = require('./db')
const { ObjectId } = require('mongodb')

// Config Resolvers
module.exports = {
  Query:{
    getCourses: async () => {
      let db
      let courses = []
      try {
        db = await connectDb()
        courses = await db.collection('courses').find().toArray()
      } catch (error) {
        console.log('Aqui hay un error: -------------->>>>\n', error)
      }
      return courses
    },
    getCourse: async(root, {id}) => {
      let db, course
      try {
        db = await connectDb()
        course = await db.collection('courses').findOne(ObjectId(id))
      } catch (error) {
        console.log('Aqui hay un error: -------------->>>>\n', error)
      }
      return course
    }
  }
}