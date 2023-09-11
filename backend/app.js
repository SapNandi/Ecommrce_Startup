const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

const errorMiddleware = require("./Middleware/error");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Route Imports
const productRoute = require("./routes/ProductRoute");
const userRoute = require("./routes/UserRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;