const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const corsMiddleware = require("./middleware/cors.middleware");
const filePathMiddleware = require("./middleware/filepath.middleware");
const path = require("path");
const app = express();
const PORT = process.env.PORT || config.get("serverPort");

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, "files")))
app.use(express.json());
app.use(express.static("static"));
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => { 
  try {
    mongoose.connect(config.get("DBURL"));
    app.listen(PORT, () => {
      console.log("Сервер запущен на порту " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
