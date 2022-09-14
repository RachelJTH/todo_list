const mongoose = require('mongoose') //import mongoose

// mongodb 連線相關
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true}) // set connection to mongoDB

const db = mongoose.connection

// 連線異常警示
db.on('error', () => {
    console.log('mongodb error!')
})

// 連線成功提示; once表示僅執行第一次，後續符合條件也不會再執行
db.once('open', () => {
    console.log('mongodb connected')
})

module.exports = db

