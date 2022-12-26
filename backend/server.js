const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads",express.static('uploads'));

 // Routes
app.use("/api/jobs",  require("./routes/jobRoutes"));
app.use("/api/users",  require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});