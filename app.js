import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import routerError from "./router/routerError.js";
import routerProduct from "./router/routerProduct.js";
import fs from "fs";
import * as bcrypt from "bcrypt";
// import path from "path";
import routerUsers from "./router/routerUser.js";
import routerOrders from "./router/routerOrder.js";
import adminSchema from "./model/data/adminSchema.js";
import routerAdmin from "./router/routerAdmin.js";
const app = express();
const port = 5000;
const URLDATABASE = `mongodb+srv://yudiberland:kawasanzombi1998@microserirvices.lru6i.mongodb.net/shopOnline?retryWrites=true&w=majority&appName=microserirvices`;

(async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/uploads", express.static("uploads"));
  app.use("/uploads", express.static("uploads"));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use("/api", routerProduct);
  app.use("/api", routerUsers);
  app.use("/api", routerOrders);
  app.use("/api", routerAdmin);
  app.use(routerError);

  // ! Error middleware
  app.use(async (error, req, res, next) => {
    let pesan;
    let status;
    if (req.files?.gambar || req.files?.gambarDanKeterangan) {
      req.files.gambar?.map((data) =>
        fs.unlink(data.path, (err) => console.log(err))
      );
      req.files.gambarDanKeterangan?.map((data) =>
        fs.unlink(data.path, (err) => console.log(err))
      );
    }
    if (req.file) fs.unlink(req.file.path, (err) => console.log(err));
    if (error.statusCode === 500) {
      status = error.statusCode;
      pesan = "server bermasalah";
      return res
        .status(status)
        .json({ error: { pesan: `${pesan + " " + status}` } });
    }
    status = error.statusCode || 401;
    pesan = error.message;
    await res
      .status(status)
      .json({ error: { pesan: `${pesan + " " + status}` } });
  });

  await mongoose.connect(URLDATABASE, async (err, db) => {
    const data = await adminSchema.findOne();
    if (!data) {
      await bcrypt.hash("lords1234", 10, async (err, hash) => {
        if (err) console.log(err);
        else {
          const user = new adminSchema({
            nama: "Lord's Admin",
            email: "adminlordstailor@gmail.com",
            password: hash,
          });
          user.save();
        }
      });
    }

    if (err) console.log(err);
    await app.listen(port, () => console.log(`konek dan konek ke database`));
    db.on("disconnect", function (errrs) {
      console.log("Error...close", errrs);
    });
  });
})();
