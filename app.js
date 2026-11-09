//import name from 'library_name';

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const paymentRoute = require("./routes/payment");


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
console.log("PORT =>", PORT);

app.use("/auth", authRoute);
app.use("/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("WELCOME TO NOJS TO EXPRESS JS SERVER");
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
