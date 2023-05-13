const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");

const app = express();

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your front-end application
    credentials: true, // Enable cookies and other credentials in cross-origin requests
  })
);

// Routes
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", payment);


// Error handler middleware
app.use(errorHandler);

module.exports = app;
