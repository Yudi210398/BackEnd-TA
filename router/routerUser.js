import { body } from "express-validator";
// import multer from "multer";
// import { v4 } from "uuid";`
import express from "express";
import {
  addCart,
  addQtyCart,
  getIdUser,
  getCartUSer,
  getUsers,
  loginUser,
  minQtyCart,
  postUsers,
  deleteCartId,
  addAlamat,
  editProfileUser,
  postKeranjangOrder,
  patchKeranjangOrderLimitPembayaran,
  dataKemas,
} from "../controller/contollerUser.js";
import { fileUpload } from "./routerProduct.js";
import usersShema from "../model/data/usersShema.js";
import HttpError from "../model/DummyData/http-error.js";
import { jsonVerify } from "../middleware/json-verrify.js";
const routerUsers = express.Router();

export const authLogin = (schema) => {
  return [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("tolong masukan email dengan benar")
      .toLowerCase()
      .trim()
      .custom(async (value, { req }) => {
        users = await schema.findOne({ email: value });
        if (!users) throw new HttpError("Email belum terdaftar", 404);
        return true;
      }),
    body("password").isLength({ min: 5 }).withMessage("minimal 5 karaketer"),
  ];
};

let users;
routerUsers.get("/allusers", jsonVerify, getUsers);
routerUsers.get("/getaIdUsers", jsonVerify, getIdUser);
routerUsers.get("/getaIdcart", jsonVerify, getCartUSer);
routerUsers.patch("/addQyt", jsonVerify, addQtyCart);
routerUsers.patch("/minQyt", jsonVerify, minQtyCart);
routerUsers.patch(
  "/limitpembayaran",
  jsonVerify,
  patchKeranjangOrderLimitPembayaran,
);
routerUsers.post("/keranjangorder", jsonVerify, postKeranjangOrder);

routerUsers.delete("/deletecartid", jsonVerify, deleteCartId);

routerUsers.get("/datakemas", jsonVerify, dataKemas);

routerUsers.patch(
  "/editdata",
  fileUpload.single("gambar"),
  [
    body("namaUser").notEmpty().trim().withMessage("Tidak Boleh kosong"),
    body("gender").notEmpty().trim().withMessage("Tidak Boleh kosong"),
  ],
  jsonVerify,
  editProfileUser,
);
routerUsers.post(
  "/addAlamat",
  [
    body("provinsiKota")
      .notEmpty()
      .isString()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Tolong Masukan Data Provinsi dengan benar"),
    body("kecamatan")
      .notEmpty()
      .trim()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Tolong Masukan Data Kecamatan dengan benar"),
    body("alamatLengkap")
      .notEmpty()
      .isString()
      .isLength({ min: 7 })
      .withMessage("Tolong Masukan Data alamatLengkap dengan benar"),
    body("patokan")
      .notEmpty()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Tolong Masukan Data dengan benar"),
    body("namaCustomer")
      .notEmpty()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Tolong Masukan Data namaCustomer dengan benar"),
    body("handphone")
      .notEmpty()
      .isString()
      .isLength({ min: 10, max: 14 })
      .withMessage("Tolong Masukan Nomor Handphone dengan benar"),
  ],
  jsonVerify,
  addAlamat,
);
routerUsers.post("/addCart", jsonVerify, addCart);
routerUsers.post(
  "/allregister",
  fileUpload.single("gambar"),
  [
    body("namaUser")
      .notEmpty()
      .isLength({ min: 3 })
      .isString()
      .withMessage("Tolong Diisi"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("tolong masukan email dengan benar")
      .toLowerCase()
      .trim()
      .custom(async (value, { req }) => {
        let user = await usersShema.findOne({ email: value });
        if (user) throw new HttpError("email sudah terdatar", 404);
        return true;
      }),
    body("password").isLength({ min: 5 }).withMessage("minimal 5 karaketer"),
    body("passValidasi").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new HttpError("password harus sama", 401);
      return true;
    }),
  ],
  postUsers,
);

routerUsers.post("/login", authLogin(usersShema), loginUser);

export default routerUsers;
