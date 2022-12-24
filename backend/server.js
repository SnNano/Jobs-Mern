const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 // Routes
app.use("/api/jobs",  require("./routes/jobRoutes"))
app.use("/api/users",  require("./routes/userRoutes"))

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});