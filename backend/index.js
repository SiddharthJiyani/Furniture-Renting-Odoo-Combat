const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bookingRouter = require('./routes/bookings');

const port = process.env.PORT || 4000;

// database connection
const db = require("./config/database");
db.connectDB();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// *** Routes ***
app.get("/", (req, res) => {
    res.send("<h1>This is homepage</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>This is about page</h1>");
});

app.use('/api/bookings', bookingRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});