require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwt_token_key = process.env.JWT_TOKEN_KEY

const generateJwtToken = (_id) => {
    //json web token generate
    return jwt.sign(
        {
            _id
        },
        process.env.jwt_token_key,
        {
            expiresIn: "7d"
        })
}

module.exports = { generateJwtToken }