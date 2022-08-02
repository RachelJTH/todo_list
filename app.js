const express = require('express')
const mongoose = require('mongoose') //import mongoose

const app = express()
const port = 3000

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

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`express is listen on localhost:${port}`)
})