const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async function (accessToken, refreshToken, profile, done) {
    try {
        let user = await prisma.user.upsert({
            where: {
                email: profile.emails[0].value,

            },
            update: {
                googleId: profile.id
            },
            create: {
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            }
        })
        done(null, user)
    } catch (error) {
        done(error, null)

    }
}))

// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser(async (id, done) => {

//     const checkUser = await prisma.user.findUnique({
//         where: {
//             id
//         }
//     })

//     done(null, checkUser)
// })


// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, AuthUser))

module.exports = passport