const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const bookingRoutes = require('./routes/bookings');

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
const furnitureRoutes = require("./routes/furniture");

app.use("/api/auth", userRoutes);
app.use("/api/furniture",furnitureRoutes)

const categoryRoutes = require("./routes/category");
const bookingRouter = require('./routes/bookings');
const paymentRoutes = require('./routes/Payment');
app.use("/api/auth", userRoutes);
app.use("/api/furniture",furnitureRoutes)
app.use('/api/bookings', bookingRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/payment", paymentRoutes);


// Database connection
const db = require("./config/database");
const authenticateToken = require("./middleware/authMiddleware");
db.connectDB();

// Booking Router

app.use('/api/bookings', authenticateToken, bookingRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });