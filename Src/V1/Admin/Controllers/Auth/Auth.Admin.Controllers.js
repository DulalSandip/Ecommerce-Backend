const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { AdminAuth } = require("../../Models/Auth/Auth.Models")
const { generateJwtToken } = require("../../../helpers/TokenCreation")

module.exports = {
    signUp: async (req, res) => {
        const { name, email, phone } = req.body

        const isAdminExists = await AdminAuth.findOne({ email })
        if (isAdminExists) {
            return res.status(409).json({
                status: false,
                message: "Email already exists.Please try new one"
            })
        } else {
            //hash admin password

            if (req.body.password === req.body.confirmPassword) {


                const salt = bcrypt.genSaltSync(10)
                const hasedPassword = bcrypt.hashSync(req.body.password, salt)

                let newAdmin = new AdminAuth({
                    name, email, phone, password: hasedPassword, confirmPassword: hasedPassword
                })

                const token = generateJwtToken(newAdmin._id)

                newAdmin.token = token
                //setting in cookies

                const saveAdminAuth = await newAdmin.save()
                if (!saveAdminAuth) {
                    return res.status(400).json({
                        status: false,
                        message: "Error during signup creation"
                    })
                } else {
                    return res.status(201).json({
                        status: true,
                        message: "Your account has been created successfully",
                        admin: saveAdminAuth
                    })
                }
            } else {
                return res.status(403).json({
                    status: false,
                    message: "Password donot match"
                })
            }

        }
    },

    login: async (req, res) => {
        const { email } = req.body

        const isEmailExists = await AdminAuth.findOne({ email })


        const isPasswordMatch = bcrypt.compareSync(req.body.password, isEmailExists.password)
        if (!isEmailExists || !isPasswordMatch) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password"
            })

        } else {
            return res.status(200).json({
                status: true,
                message: "Login success",
                admin: isEmailExists
            })
        }





    }
}