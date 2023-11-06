const route = require('express').Router()
const passport = require('../../lib/pssport')
const { CreateUser, Login, O, Oauth2 } = require('../../controller/user.controller')
const restrict = require('../../middleware/restrict')

// route.get('/register', (req, res, next) => {
//     res.render('register.ejs')
//     return
// })

// route.get('/dashboard', restrict, (req, res, next) => {
//     res.render('dashboard', { user: req.user })
// })


route.post('/register', CreateUser)
route.post('/login', Login)
route.post('/whoami', restrict, (req, res) => {
    return res.status(200).json({
        status: 200,
        message: 'success',
        data: {
            user: req.user
        }
    })
})

route.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

route.get('/google.com/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
}),
    Oauth2)

// route.get('/login', (req, res) => {
//     res.render('login.ejs')
// })
// route.post('/login', passport.authenticate('local', {
//     successRedirect: '/v1/user/dashboard',
//     failureRedirect: '/v1/user/login'
// }))


module.exports = route