const express = require("express")
const router = express.Router()
const { signup, login } = require("../controllers/Auth")

// user routes of login and signup


router.post("/signup", signup)
router.post("/login", login)

module.exports = router