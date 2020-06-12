const express = require("express");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const camps = require("./routes/camps");
const courses = require("./routes/courses");
const reviews = require("./routes/reviews");
const newsletter = require("./routes/newsletter");
const message = require("./routes/message");
const PORT = process.env.PORT || 5000;
const dbConnection = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(cors());

dbConnection();
app.use("/api/v1/auth", auth);
app.use("/api/v1/camps", camps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/newsletter", newsletter);
app.use("/api/v1/message", message);

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
