import adminSchema from "../model/data/adminSchema.js";
import HttpError from "../model/DummyData/http-error.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { allproductFungsi } from "./contollerProduct.js";

// const generetToken = async (user) =>
//   await jwt.sign({ email: user.email, idAdmin: user._id }, "admin_rahasia", {
//     expiresIn: "15m",
//   });

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const expiresAt = new Date(Date.now() + 604800000);
    const error = validationResult(req);
    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);

    const data = await adminSchema.findOne({ email });

    bcrypt.compare(password, data.password, async (err, result) => {
      try {
        if (!result) throw new HttpError("Password Salah", 401);

        if (result) {
          const token = jwt.sign(
            { idAdmin: data._id, email: data.email },
            "admin_rahasia",
            {
              expiresIn: "15m",
            },
          );
          const refreshToken = jwt.sign(
            {
              email: data.email,
              idAdmin: data._id,
            },
            "admin_Kedua_Rahasia",
            { expiresIn: "168h" },
          );
          data.token = refreshToken;
          data.expiresAt = expiresAt;
          data.save();
          return res.status(201).json({
            pesan: "sukses login",
            userId: data._id,
            email: data.email,
            token,
            refreshToken,
          });
        }
        throw new HttpError("Password Salah", 401);
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.tokenrefresh;
    const cariToken = await (
      await adminSchema.find()
    ).filter((data) => data.token === refreshToken);

    if (cariToken.length === 0) throw new HttpError("Tidak ada Data", 401);
    const data = cariToken[0];
    if (data.expiresAt.getTime() > Date.now() === false) {
      data.expiresAt = null;
      data.token = null;
      data.save();
      throw new HttpError("Token Kadaluarsa", 401);
    }
    jwt.verify(refreshToken, "admin_Kedua_Rahasia", async (err, user) => {
      try {
        if (err) throw new HttpError("Token Kadaluarsa", 401);
        const aksentoken = jwt.sign(
          { idAdmin: data._id, email: data.email },
          "admin_rahasia",
          {
            expiresIn: "15m",
          },
        );
        res.status(201).json({
          data,
          aksentoken,
        });
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getDataAdmin = async (req, res, next) => {
  try {
    const getData = await adminSchema.findOne({
      email: "adminlordstailor@gmail.com",
    });
    if (!getData) throw new HttpError("Tidak ada Data", 401);
    console.log(`kocak`);
    res.status(201).json({
      getData,
    });
  } catch (err) {
    next(err);
  }
};

export const allProdukAdmin = async (req, res, next) => {
  try {
    await allproductFungsi(res);
    console.log(req.dataAmin.idAdmin);
  } catch (err) {
    next(err);
  }
};

export const deleteToken = async (req, res, next) => {
  try {
    const dataAdmin = await adminSchema.findById(req.dataAmin.idAdmin);
    dataAdmin.token = null;
    dataAdmin.expiresAt = null;
    dataAdmin.save();
    res.status(201).json({
      dataAdmin,
    });
  } catch (err) {
    next(err);
  }
};

export const suksesOrder = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
