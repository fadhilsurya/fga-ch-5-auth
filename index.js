require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash')
const PORT = process.env.PORT || 3000
const route = require('./route/routes')


app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// app.use(passport.initialize())
// app.use(passport.session())

// app.use(session({
//     secret: 'rahasia',
//     resave: true,
//     saveUninitialized: true
// }))

// app.use(flash())

app.use('/', route)


app.listen(PORT, () => {
    console.log(`listening, live and well at port ${PORT}`)
})