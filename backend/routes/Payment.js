// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifyPayment,
} = require("../controllers/Payment")
const authenticateToken = require("../middleware//authMiddleware")

router.post("/capturePayment", authenticateToken ,capturePayment)
router.post("/verifyPayment", authenticateToken, verifyPayment)

module.exports = router 
