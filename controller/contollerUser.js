import Users from "../model/data/usersShema.js";
import jwt from "jsonwebtoken";
import HttpError from "../model/DummyData/http-error.js";
import { validationResult } from "express-validator";
import usersShema from "../model/data/usersShema.js";
import bcrypt from "bcrypt";
import fs from "fs";
import orderShema from "../model/data/orderShema.js";

let tanggal = function () {
  const dates = new Date();
  dates.setTime(dates.getTime() + 1 * 24 * 60 * 60 * 1000);
  const option = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("id-ID", option).format(dates);
};

const userCart = async (reqs) => {
  const { produkIds } = reqs.body;
  const datas = await usersShema.findById(reqs.userData.id);
  const datasStock = await usersShema
    .findById(reqs.userData.id)
    .populate("keranjang.item.produkIds");
  const hasildataStock = datasStock.keranjang.item.filter(
    (data) => data._id.toString() === produkIds,
  );
  const hasilDatas = datas.keranjang.item.filter(
    (data) => data._id.toString() === produkIds,
  );
  return { hasilDatas, datas, datasStock, hasildataStock };
};

export const getUsers = async (req, res, next) => {
  try {
    const userPlace = await Users.find();
    if (userPlace.length === 0) throw new HttpError("Tidak ada Data", 201);
    const allusers = userPlace.length;
    res.status(200).json({
      userPlace,
      allusers,
      jumlahDataUser: userPlace.length,
    });
  } catch (err) {
    next(err);
  }
};

export const postUsers = async (req, res, next) => {
  try {
    const { namaUser, email, password } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);
    if (!req.file.path)
      throw new HttpError("Belum memasukan gambar yg Harus dimasukan", 401);

    await bcrypt.hash(password, 10, async (err, hash) => {
      try {
        if (err) throw new HttpError("Tidak bisa encrype password", 401);
        else {
          const userUpdate = await new usersShema({
            namaUser,
            email,
            password: hash,
            gambar: req.file.path,
          }).save();
          res.status(200).json({
            userUpdate,
            sukses: "Berhasil Update",
          });
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);
    const dataEmail = await usersShema.findOne({ email });
    await bcrypt.compare(password, dataEmail.password, (err, result) => {
      try {
        if (!result) throw new HttpError("Password Salah", 401);

        if (result) {
          const token = jwt.sign(
            {
              email: dataEmail.email,
              id: dataEmail._id,
              kerangjang: dataEmail.keranjang.item.length,
            },
            "rahasia_ilahi",
            { expiresIn: "1d" },
          );
          return res.status(201).json({
            pesan: "sukses login",
            userId: dataEmail._id,
            keranjang: dataEmail.keranjang.item,
            token,
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

export const getCartUSer = async (req, res, next) => {
  try {
    const dataId = await usersShema.find().populate("keranjang.item.produkIds");
    const dataIdUser = dataId.filter((data) => {
      return data._id.toString() === req.userData.id;
    });
    if (dataIdUser.length === 0) throw new HttpError("Data tidak Ada", 401);
    res.status(201).json({
      dataIdCart: dataIdUser[0].keranjang,
    });
  } catch (err) {
    next(err);
  }
};

export const getIdUser = async (req, res, next) => {
  try {
    const dataId = await usersShema
      .find()
      .populate("keranjang.item.produkIds keranjangOrder.item.produkIds");
    const dataIdUser = dataId.filter(
      (data) => data._id.toString() === req.userData.id,
    );
    if (dataIdUser.length === 0) throw new HttpError("Data tidak Ada", 401);

    res.status(201).json({
      dataIdUser,
    });
  } catch (err) {
    next(err);
  }
};

export const addQtyCart = async (req, res, next) => {
  try {
    const { hasilDatas, datas, datasStock, hasildataStock } = await userCart(
      req,
    );
    const listItemCart = datasStock.keranjang.item;

    hasilDatas[0].quantity++;
    datas.save();
    res.status(201).json({
      hasilDatas,
      datas,
      listItemCart,
      hasildataStock,
    });
  } catch (err) {
    next(err);
  }
};

export const minQtyCart = async (req, res, next) => {
  try {
    const { hasilDatas, datas } = await userCart(req);
    hasilDatas[0].quantity--;
    datas.save();
    res.status(201).json({
      hasilDatas,
    });
  } catch (err) {
    next(err);
  }
};

export const addCart = async (req, res, next) => {
  try {
    const { produkIds, quantity, noteProduk, ukuran } = req.body;
    const dataUser = await usersShema.findById(req.userData.id);

    const kerajangindex = dataUser.keranjang.item.findIndex(
      (dataIndeks) =>
        dataIndeks.produkIds.toString() === produkIds &&
        dataIndeks.ukuran === ukuran &&
        dataIndeks.noteProduk === noteProduk,
    );
    let quantityAdd;
    let productPush =
      dataUser.keranjang.item === undefined ? [] : [...dataUser.keranjang.item];

    if (kerajangindex >= 0) {
      quantityAdd = dataUser.keranjang.item[kerajangindex].quantity + quantity;
      productPush[kerajangindex].quantity = quantityAdd;
    } else {
      await productPush.push({
        produkIds,
        quantity,
        noteProduk,
        ukuran,
      });
    }

    dataUser.keranjang.item = productPush;
    await dataUser.save();
    res.status(201).json({
      dataUser,
      pesan: "Sukses",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCartId = async (req, res, next) => {
  try {
    const { idProduct } = req.body;
    const { datas } = await userCart(req);

    const hasilDatas = datas.keranjang.item.filter(
      (data) => data._id.toString() !== idProduct,
    );
    datas.keranjang.item = hasilDatas;
    datas.save();
    res.status(201).json({
      datas,
      hasilDatas,
    });
  } catch (err) {
    next(err);
  }
};

export const addAlamat = async (req, res, next) => {
  try {
    const dataUserAlamat = await usersShema.findById(req.userData.id);

    if (dataUserAlamat.alamat.rumah.length > 0)
      dataUserAlamat.alamat.rumah.shift();
    const {
      provinsiKota,
      kecamatan,
      alamatLengkap,
      patokan,
      namaCustomer,
      handphone,
    } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);

    let dataAlamat = [];
    await dataAlamat.push({
      provinsiKota,
      kecamatan,
      alamatLengkap,
      patokan,
      namaCustomer,
      handphone,
    });
    dataUserAlamat.alamat.rumah = dataAlamat;
    await dataUserAlamat.save();
    res.status(201).json({
      dataUserAlamat,
    });
  } catch (err) {
    next(err);
  }
};

export const editProfileUser = async (req, res, next) => {
  try {
    const allIUser = await usersShema.find();
    const filterData = allIUser.filter(
      (data) => data._id.toString() === req.userData.id,
    );
    if (filterData.length === 0) throw new HttpError("data Kosong", 401);
    const { namaUser, gender } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);
    const hasil = filterData[0];
    fs.unlink(hasil.gambar, (err) => console.log(err, ` `));
    hasil.namaUser = namaUser;
    hasil.gender = gender;
    hasil.gambar = req.file.path;

    await hasil.save();

    res.status(201).json({ hasil });
  } catch (err) {
    next(err);
  }
};

export const postKeranjangOrder = async (req, res, next) => {
  try {
    const userKeranjang = await usersShema.findById(req.userData.id);
    userKeranjang.keranjangOrder.item = userKeranjang.keranjang.item;
    userKeranjang.keranjangOrder.waktuBatasPembayaran = tanggal();
    userKeranjang.keranjang.item = [];
    // const keranjangOrder = await new usersShema({
    //   keranjangOrder: userKeranjang.keranjang.item,
    // });

    await userKeranjang.save();

    res.status(201).json({ userKeranjang });
  } catch (err) {
    next(err);
  }
};

export const patchKeranjangOrderLimitPembayaran = async (req, res, next) => {
  try {
    const patchUserKeranjangOrder = await usersShema.findById(req.userData.id);

    patchUserKeranjangOrder.keranjangOrder.item = [];
    patchUserKeranjangOrder.keranjangOrder.waktuBatasPembayaran = null;

    await patchUserKeranjangOrder.save();

    res.status(201).json({ patchUserKeranjangOrder });
  } catch (err) {
    next(err);
  }
};

export const dataKemas = async (req, res, next) => {
  try {
    const dataOrderUser = await orderShema
      .find({ userId: req.userData.id })
      .populate("userId produks.produk");

    const ordersData = dataOrderUser;
    console.log(dataOrderUser);
    res.status(201).json({
      ordersData,
    });
  } catch (err) {
    next(err);
  }
};
