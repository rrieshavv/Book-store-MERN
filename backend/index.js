import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDB_URL } from "./config.js";

import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing req body
app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  res.send("This is the default route");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`Server is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
