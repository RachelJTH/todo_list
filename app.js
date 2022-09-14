const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes') // 引用路由器整包
require('./config/mongoose') //執行config內的mongoose，不給予變數是因為後續並不會引用

const app = express()
const port = 3000

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