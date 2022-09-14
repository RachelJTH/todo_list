const express = require('express')
const mongoose = require('mongoose') //import mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') // import todo model
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes') // 引用路由器整包
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

// 引用 methodOverride, 來轉換前端回傳至後端的CRUD 
app.use(methodOverride('_method'))

// 使用路由器
app.use(routes)



app.listen(port, () => {
    console.log(`express is listen on localhost:${port}`)
})  