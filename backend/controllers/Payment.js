const { instance } = require("../config/razorpay")
const Furniture = require("../models/Furniture")


// Capture the payment and initiate the Razorpay order 
exports.capturePayment = async (req, res) => {
    try{
        const { totalPrice } = req.body
        const options = {
            amount: totalPrice * 100, // amount in smallest currency unit
            currency: "INR",
            payment_capture: 1,
        };
        const response = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            data: response,
        });        
    }

    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Payment cannot be captured. Please try again.",
        })
    }
    

}
  
  // verify the payment
  exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };
  