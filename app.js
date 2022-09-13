const express = require('express')
const mongoose = require('mongoose') //import mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') // import todo model
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// mongodb 連線相關
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}) // set connection to mongoDB
const dbStatus = mongoose.connection
// 連線異常警示
dbStatus.on('error', () => {
    console.log('mongodb error!')
})

// 連線成功提示; once表示僅執行第一次，後續符合條件也不會再執行
dbStatus.once('open', () => {
    console.log('mongodb connected')
})

// View: 設定template engine
app.engine('hbs', exphbs({defaultLayouts: 'main', extname: '.hbs'})) // 建立名叫hbs的engine, 並傳入exphbs與對應的參數
app.set('view engine', 'hbs') // 啟用樣版引擎:向express指定要進行的engine是前述設定的 'hbs' engine

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    // Controller
    Todo.find() // 未有參數，表示不另行篩選
        .lean() // 清理傳入內容
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error)) // 進行錯誤處理   
})

app.get('/todos/new', (req, res) => {
    res.render('new')
})

app.post('/todos', (req, res) => {
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

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    Todo.findById(id) // 找特定id
        .lean()
        .then(todo => res.render('detail', { todo })) // == todo:todo
        .catch(error => console.error(error))
})

app.get('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    Todo.findById(id) // 找特定id
        .lean()
        .then(todo => res.render('edit', { todo })) // == todo:todo
        .catch(error => console.log(error))
}) 


app.post('/todos/:id/edit', (req, res) => { // 接住 edit.hbs所輸入的input post
    const id = req.params.id
    const { name, isDone } = req.body // 採用解構賦值方式
    Todo.findById(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on' 
            // isDone尤前端回傳(post) checkbox 狀態值是"on" 或是"off"; 所以todo.isDone這個值被賦予True/False的值

            return todo.save()
        })
        .then(() => res.redirect(`/todos/:${id}`))
        .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req, res) => {
    const id = req.params.id
    return Todo.findById(id) // 主要目的是先確保資料庫有這筆資料，才進行刪除
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`express is listen on localhost:${port}`)
})  