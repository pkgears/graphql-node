'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')

module.exports = {
  createCourse: async(root,{input}) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return newCourse
  },
  editCourse: async(root, {id, input})=>{
    let db, course
    try {
      db = await connectDb()
      course = await db.collection('courses').updateOne(
        {_id: ObjectId(id)},
        {$set: input}
      )
      course = await db.collection('courses').findOne(ObjectId(id))
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return course
  },
  createStudent: async(root,{input}) => {
    const newStudent = Object.assign(input)
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(newStudent)
      newStudent._id = student.insertedId
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return newStudent
  },
  editStudent: async(root, {id, input})=>{
    let db, student
    try {
      db = await connectDb()
      student = await db.collection('students').updateOne(
        {_id: ObjectId(id)},
        {$set: input}
      )
      student = await db.collection('students').findOne(ObjectId(id))
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return student
  },
  addPeople: async(root, {courseId, personId})=>{
    let db, course, person
    try {
      db = await connectDb()
      person = await db.collection('students').findOne(ObjectId(personId))
      course = await db.collection('courses').findOne(ObjectId(courseId))
      if(!course || !person) throw new Error("La persona o el curso no existen")
  
      await db.collection('courses').updateOne(
        {_id: ObjectId(courseId)},
        {$addToSet: {people: ObjectId(personId)}}
      )
      console.log("Se agrego una persona")
    } catch (error) {
      console.log('Aqui hay un error: -------------->>>>\n', error)
    }
    return course
  }
};
