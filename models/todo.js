const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
    name:{
        type: String,
        required: true  
    }, 
    done: {
        type: Boolean
    }
})

model.exports = mongoose.model('Todo', todoSchema) // 設定一個新的輸出