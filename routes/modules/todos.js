const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/todos/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    const name = req.body.name
    // method 1 === method 2
    // method 1: 產生一個實例(是一筆資料的形式，但還沒有塞到資料庫裡); 再存進資料庫
    // const todo = new Todo({ name:name })
    // return todo.save()
    //     .then(() => res.redirect('/'))
    //     .catch(error => console.log(error))

    // method 2: 直接命令mongoose去建立一個新的Todo物件並新增至資料庫
    // return Todo.create({ name:name })
    return Todo.create({ name })
        .then(() => res.redirect('/')) // 重新導回首頁
        .catch(error => console.log(error))
})

router.get('/:id/', (req, res) => {
    const id = req.params.id
    Todo.findById(id) // 找特定id
        .lean()
        .then(todo => res.render('detail', { todo })) // == todo:todo
        .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Todo.findById(id) // 找特定id
        .lean()
        .then(todo => res.render('edit', { todo })) // == todo:todo
        .catch(error => console.log(error))
}) 

router.put('/:id', (req, res) => { // 接住 edit.hbs所輸入的input post
    const id = req.params.id
    const { name, isDone } = req.body // 採用解構賦值方式
    Todo.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on' 
            // isDone尤前端回傳(post) checkbox 狀態值是"on" 或是"off"; 所以todo.isDone這個值被賦予True/False的值

            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id/', (req, res) => {
    const id = req.params.id
    return Todo.findById(id) // 主要目的是先確保資料庫有這筆資料，才進行刪除
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router