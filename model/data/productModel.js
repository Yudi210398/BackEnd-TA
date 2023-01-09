import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

/* //! Fungsi Ukuran
const fungsiSaveUkuran = function (datanya) {
  let datas = { 
    kemBatJas: datanya.ukuran.kemBatJas,
    celana: datanya.ukuran.celana,
  };
  datanya.ukuran = datas;
  return datanya.save();
}; 

*/

const ProdcutSchema = new Schema({
  namaPakian: { type: String, required: true },
  idProduct: { type: String, required: true, unique: true },
  gambar: [{ type: String, required: true }],
  jenisPakaian: { type: String, required: true },
  stock: { type: Number, required: true },
  harga: { type: Number, required: true },
  deskripsi: { type: String, required: true },
  reviewProduct: [{ type: String, required: true }],
  ukuran: {
    kemBatJas: [
      {
        ukuranS: String,
        ukuranM: String,
        ukuranL: String,
        ukuranXL: String,
      },
    ],
    celana: [
      {
        ukuran28: String,
        ukuran29: String,
        ukuran30: String,
        ukuran31: String,
        ukuran32: String,
        ukuran33: String,
        ukuran34: String,
        ukuran35: String,
        ukuran36: String,
        ukuran37: String,
        ukuran38: String,
        ukuran39: String,
        ukuran40: String,
        ukuran41: String,
        ukuran42: String,
      },
    ],
  },
  gambarDanKeterangan: [
    {
      gambar: { type: String },
      keterangan: { type: String },
    },
  ],
});

ProdcutSchema.methods.ukurankemBatJas = function (data) {
  this.ukuran.kemBatJas.push({
    ukuranS: data.ukuranS === "undefined" ? "" : data.ukuranS.trim(),
    ukuranM: data.ukuranM === "undefined" ? "" : data.ukuranM.trim(),
    ukuranL: data.ukuranL === "undefined" ? "" : data.ukuranL.trim(),
    ukuranXL: data.ukuranXL === "undefined" ? "" : data.ukuranXL.trim(),
  });
};

ProdcutSchema.methods.reviewProduct;

ProdcutSchema.methods.celana = function (data) {
  this.ukuran.celana.push({
    ukuran28: data.ukuran28 === "undefined" ? "" : data.ukuran28.trim(),
    ukuran29: data.ukuran29 === "undefined" ? "" : data.ukuran29.trim(),
    ukuran30: data.ukuran30 === "undefined" ? "" : data.ukuran30.trim(),
    ukuran31: data.ukuran31 === "undefined" ? "" : data.ukuran31.trim(),
    ukuran32: data.ukuran32 === "undefined" ? "" : data.ukuran32.trim(),
    ukuran33: data.ukuran33 === "undefined" ? "" : data.ukuran33.trim(),
    ukuran34: data.ukuran34 === "undefined" ? "" : data.ukuran34.trim(),
    ukuran35: data.ukuran35 === "undefined" ? "" : data.ukuran35.trim(),
    ukuran36: data.ukuran36 === "undefined" ? "" : data.ukuran36.trim(),
    ukuran37: data.ukuran37 === "undefined" ? "" : data.ukuran37.trim(),
    ukuran38: data.ukuran38 === "undefined" ? "" : data.ukuran38.trim(),
    ukuran39: data.ukuran39 === "undefined" ? "" : data.ukuran39.trim(),
    ukuran40: data.ukuran40 === "undefined" ? "" : data.ukuran40.trim(),
    ukuran41: data.ukuran41 === "undefined" ? "" : data.ukuran41.trim(),
    ukuran42: data.ukuran42 === "undefined" ? "" : data.ukuran42.trim(),
  });
};

ProdcutSchema.plugin(mongooseUniqueValidator);
export default mongoose.model("Produks", ProdcutSchema);
