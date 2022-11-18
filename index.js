require("dotenv").config();
const express = require("express")



const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    return res.status(200).json({
        status: false,
        message: "Welcome to the home page"
    })
})

const PORT = process.env.PORT

require("./database_connection")

const signUpAdminRoutes = require("./Src/V1/Admin/Routes/Auth/Auth.Admin.Routes")

app.use("/api", signUpAdminRoutes)

app.listen(PORT, () => {
    console.log(`Server connected successfully on port ${PORT}`)
})