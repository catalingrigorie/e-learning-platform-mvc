const express = require("express");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const PORT = process.env.PORT || 5000;
const dbConnection = require("./config/db");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(cors());

dbConnection();
app.use("/v1/", auth);

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
