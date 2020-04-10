'use strict'
const { ObjectId } = require('mongodb')
const connectDb = require('./db')
module.exports = {
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
  },
  getStudents: async () => {
    let db
    let students = []
    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return students
  },
  getStudent: async(root, {id}) => {
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne(ObjectId(id))
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return student
  }
}
