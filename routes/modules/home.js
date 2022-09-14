const express = require('express')
const router = express.Router()

// require Todo model
const Todo = require('../../models/todo')

// define the router of home page

router.get('/', (req, res) => {
    Todo.find() // 未有參數，表示不另行篩選
        .lean() // 清理傳入內容
        // .sort(name: 'asc') //asc: 正序; desc: 反序; 這邊指定"name"作為主要排序的欄位資料
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error)) // 進行錯誤處理   
})

module.exports = router
