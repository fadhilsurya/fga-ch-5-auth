
const bcrypt = require('bcrypt');

function HashPassword(pass) {
    const saltParse = parseInt(process.env.SALT_ROUND)
    const salt = bcrypt.genSaltSync(saltParse);
    const hash = bcrypt.hashSync(pass, salt);

    return hash
}

function ComparePassword(pass, hashPassword) {
    const compare = bcrypt.compareSync(pass, hashPassword)
    console.log(compare)
    return compare
}


module.exports = {
    HashPassword,
    ComparePassword
}