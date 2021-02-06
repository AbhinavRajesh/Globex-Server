const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");

const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("MongoDB Connection Succesfull!")
);

app.get("/", (req, res) => {
  return res.status(200).send({ message: "API endpoint at /api/v1/" });
});

app.use("/api/v1/", apiRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
