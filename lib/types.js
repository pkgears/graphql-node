'use strict'

const { ObjectId } = require('mongodb')
const connectDb = require('./db')

module.exports = {
  Course: {
    people: async ({people}) =>{
      let db, peopleData, ids
      try {
        db = await connectDb()
        ids = people ? people.map(id => ObjectId(id)) : []
        peopleData = ids.length > 0 ? await db.collection("students").find(
          {_id: {$in:ids}}
        ).toArray() : []
      } catch (error) {
        console.error(error)
      }
      return peopleData
    }
  }
};
