const { password } = require('pg/lib/defaults')
const { ComparePassword, HashPassword } = require('../helper/hash_pass.helper')
const { hash, hashSync } = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken');

async function CreateUser(req, res) {

    try {
        const hashPass = await HashPassword(req.body.password)

        const payload = {
            name: req.body.name,
            password: hashPass,
            email: req.body.email
        }

        const check = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (check) {
            req.flash('error', 'user already used')
            res.status(400).json({
                message: 'user already registered',
                status: 400,
                data: null
            })

            res.redirect('/register')
            return
        }

        await prisma.user.create({ data: payload })

        res.status(200).json({
            message: 'success',
            status: 200,
            data: null
        })
        return

    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            status: 500,
            data: error
        })
        return

    }

}

// async function AuthUser(email, password, done) {
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 email
//             }
//         })

//         if (!user) {
//             return done(null, false, {
//                 message: 'invalid email'
//             })
//         }

//         const comparePass = ComparePassword(password, user.password)

//         if (!user || !comparePass) {
//             return done(null, false, {
//                 message: 'invalid password'
//             })
//         }
//         return done(null, user)

//     } catch (error) {
//         return done(null, false, {
//             message: error.message
//         })
//     }
// }

async function Login(req, res) {


    try {
        const { email, password } = req.body

        const checkUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (user == null) {
            res.status(400).json({
                data: null,
                status: 400,
                message: "email is not found or incorrect"
            })
        }

        const checkPassword = await ComparePassword(password, checkUser.password)

        if (!checkPassword) {
            res.status(400).json({
                data: null,
                status: 400,
                message: "password is not correct"
            })
            return
        }

        const token = jwt.sign({ email: checkUser.email, user_id: checkUser.id },
            process.env.SECRET_KEY);

        res.status(200).json({
            status: 200,
            message: 'success',
            data: {
                token,
            }
        })
        return


    } catch (error) {
        res.status(500).json({
            data: error.message,
            status: 500,
            message: "internal server error"
        })
    }
}

async function Oauth2(req, res) {

    let token = jwt.sign({ ...req.user, password: null }, process.env.SECRET_KEY)

    return res.status(200).json({
        status: 'success',
        message: ' OK',
        data: {
            token
        }
    })

}


module.exports = {
    CreateUser,
    // AuthUser,
    Login,
    Oauth2
}