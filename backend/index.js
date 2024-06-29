const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bookingRouter = require('./routes/bookings');
const port = process.env.PORT || 4000 ;

// Middleware
app.use(express.json()); 

// CORS
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Routes
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

// Database connection
const db = require("./config/database");
db.connectDB();

// Booking Router
app.use('/api/bookings', bookingRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
