const express = require("express") ;
require("dotenv").config() ;
const app = express();
const cors = require("cors");


const port = process.env.PORT || 4000 ;

//Middleware
app.use(express.json()); 
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);


// *** Routes ***
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);



// database connection
const db = require("./config/database");
db.connectDB() ;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`) ; 
})

app.get("/",(req,res)=>{
    res.send("<h1>This is homepage</h1>")
})


app.get("/about",(req,res) =>{
    res.send("<h1>This is about page</h1>")
}) 