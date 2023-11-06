// module.exports = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next
//     }

//     res.redirect('/login')
// }

const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        res.status(400).json({
            status: 400,
            data: null,
            message: "user unauthorized"
        })
        return
    }

    try {

        const user = await jwt.verify(authorization, process.env.SECRET_KEY)

        req.user = user

        next()

    } catch (error) {
        res.status(401).json({
            status: 401,
            data: null,
            message: "user not authorized"
        })
        return

    }


}