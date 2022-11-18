const router = require("express").Router()
const { signUp, login } = require("../../Controllers/Auth/Auth.Admin.Controllers")

router.post("/auth/admin/signup", signUp)
router.post("/auth/admin/login", login)

module.exports = router