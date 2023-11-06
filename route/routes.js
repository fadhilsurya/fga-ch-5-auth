const route = require('express').Router()
const userV1 = require('./v1/user.route')

route.use('/v1/user', userV1)


module.exports = route