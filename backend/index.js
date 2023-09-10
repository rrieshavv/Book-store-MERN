import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDB_URL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json());

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
