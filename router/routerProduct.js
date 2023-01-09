import express from "express";
import {
  getAllProduct,
  getIdProduct,
  postProduct,
} from "../controller/contollerProduct.js";
import multer from "multer";
import { v4 } from "uuid";
import { body } from "express-validator";

import HttpError from "../model/DummyData/http-error.js";
const routerProduct = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const simpanFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${v4()}.${ext}`);
  },
});
67;

const fileFilter = (req, file, cb) => {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new HttpError("Invalid mime type!", 401);
  cb(error, isValid);
};

export const fileUpload = multer({
  storage: simpanFile,
  fileFilter,
});

export const multipleUpload = fileUpload.fields([
  { name: "gambar", maxCount: 9999 },
  { name: "gambarDanKeterangan", maxCount: 9999 },
]);

routerProduct.get("/allproduct", getAllProduct);
routerProduct.get("/allproduct/:pId", getIdProduct);
routerProduct.post(
  "/allproduct",
  multipleUpload,
  [
    body("namaPakian").isString().trim().notEmpty(),
    body("stock").isNumeric().isLength({ min: 1 }),
    body("harga")
      .isNumeric()
      .isLength({ min: 4 })
      .withMessage("harga dibawah minimum"),
    body("deskripsi")
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Deskripsi tidak boleh kosong dan minimal 5 Karakter"),
    body("jenisPakaian")
      .isString()
      .notEmpty()
      .custom((value, { req }) => {
        if (
          value === "celana" ||
          value === "batik" ||
          value === "kemeja" ||
          value === "jas"
        )
          return true;
        throw new HttpError("Jenis Pakian Tidak Terdaftar", 401);
      }),
  ],
  postProduct
);

export default routerProduct;
