// import express and routes
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')

// 如果request執行的路徑為"/"．就把執行導向'./modules/home'
router.use('/', home)
// 如果request執行的路徑為"/todos"．就把執行導向'./modules/todos 模組'
router.use('/todos', todos)

module.exports = router