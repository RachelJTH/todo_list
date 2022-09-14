const mongoose = require('mongoose')
const Todo = require("../todo")

const db = require("../../config/mongoose")

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected')
    for (let i=0; i<10; i++){
        Todo.create({name:`name-${i}`})
    }
    console.log('done')
})