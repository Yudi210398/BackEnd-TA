import express from "express";
import {
  allProdukAdmin,
  deleteToken,
  getDataAdmin,
  loginAdmin,
  refreshToken,
  suksesOrder,
} from "../controller/adminController.js";
import { getUsers } from "../controller/contollerUser.js";
import { jsonAdminVerify } from "../middleware/json-verify-admin.js";
import adminSchema from "../model/data/adminSchema.js";
import { authLogin } from "./routerUser.js";

const routerAdmin = express.Router();

routerAdmin.get("/admindata", jsonAdminVerify, getDataAdmin);

routerAdmin.get("/transaksi/sukses", jsonAdminVerify, suksesOrder);

routerAdmin.get("/allcustomer", jsonAdminVerify, getUsers);

routerAdmin.get("/allprodukadmin", jsonAdminVerify, allProdukAdmin);

routerAdmin.patch("/delete", jsonAdminVerify, deleteToken);

routerAdmin.post("/refreshtoken", refreshToken);

routerAdmin.post("/adminlogin", authLogin(adminSchema), loginAdmin);

export default routerAdmin;
