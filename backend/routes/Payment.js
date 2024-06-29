// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifyPayment,
} = require("../controllers/Payment")
const authenticateToken = require("../middleware//authMiddleware")

router.post("/capturePayment" ,capturePayment)
router.post("/verifyPayment", verifyPayment)

module.exports = router 
