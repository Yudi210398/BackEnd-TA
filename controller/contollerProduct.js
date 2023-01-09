import HttpError from "../model/DummyData/http-error.js";
import productModel from "../model/data/productModel.js";
import { validationResult } from "express-validator";

export const funsiCari = async (id, schema) => {
  const dataPlace = await schema.find();
  return dataPlace.filter((data) => data._id.toString() === id);
};

export const allproductFungsi = async (res) => {
  const dataReal = await productModel.find();
  if (dataReal.length === 0) throw new HttpError("Tidak ada Data", 401);

  return res.status(201).json({
    dataReal,
    jumlahData: dataReal.length,
  });
};

export const getAllProduct = async (req, res, next) => {
  try {
    await allproductFungsi(res);
  } catch (err) {
    next(err);
  }
};

export const getIdProduct = async (req, res, next) => {
  try {
    const pId = req.params.pId;
    const dataIdProduct = await productModel.find();
    const dataAmbil = dataIdProduct.filter((datas) => datas.idProduct === pId);
    res.status(200).json({
      dataAmbil: dataAmbil.length === 0 ? `data Kosong` : dataAmbil,
    });
  } catch (err) {
    next(err);
  }
};

export const postProduct = async (req, res, next) => {
  try {
    const dataPlace = await productModel.find();
    const { namaPakian, jenisPakaian, stock, deskripsi, harga } = req.body;
    const error = validationResult(req);
    let hasil;
    if (!error.isEmpty()) throw new HttpError(error.array()[0].msg, 401);

    if (dataPlace.length === 0) {
      const insialPakaian = jenisPakaian.split("");
      hasil = insialPakaian[0] + "-" + 1;
    } else {
      const insialPakaianss = jenisPakaian.split("");
      const dapats = dataPlace.length;

      const dapatPeoduct = dataPlace[dapats - 1].idProduct;

      const dapatPeoductSplit = dapatPeoduct?.split("-");

      const angkaIdProduct = dapatPeoductSplit?.length;

      const hasilIdAngka = dapatPeoductSplit[angkaIdProduct - 1];

      const hasilUrutanId = +hasilIdAngka + 1;
      hasil = insialPakaianss[0] + "-" + hasilUrutanId;
    }

    const postProduct = await new productModel({
      namaPakian,
      jenisPakaian,
      stock,
      deskripsi,
      harga,
      idProduct: hasil,
    });

    if (!req.files.gambar)
      throw new HttpError("Belum memasukan gambar yg Harus dimasukan", 401);

    req.files.gambar?.map((data) => {
      return postProduct.gambar.push(data.path);
    });
    console.log(req.files?.gambarDanKeterangan);
    req.files?.gambarDanKeterangan?.map((data) => {
      const datass = data.originalname.split(".");
      return postProduct.gambarDanKeterangan.push({
        gambar: data ? data.path : "",
        keterangan: !data ? "" : datass[0].trim(),
      });
    });

    if (
      jenisPakaian === "batik" ||
      jenisPakaian === "jas" ||
      jenisPakaian === "kemeja"
    )
      await postProduct.ukurankemBatJas(req.body);

    if (jenisPakaian === "celana") await postProduct.celana(req.body);

    postProduct.save();
    res.status(200).json({
      postProduct,
    });
  } catch (err) {
    next(err);
  }
};
