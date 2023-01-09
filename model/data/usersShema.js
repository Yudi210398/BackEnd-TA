import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const UsersShema = new Schema({
  namaUser: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, default: "Belum isi, harap diisi" },
  gambar: { type: String },

  alamat: {
    rumah: [
      {
        provinsiKota: { type: String, required: true },
        kecamatan: { type: String, required: true },
        alamatLengkap: { type: String, required: true },
        patokan: { type: String, required: true },
        namaCustomer: { type: String, required: true },
        handphone: { type: String, required: true },
      },
    ],
  },

  keranjang: {
    item: [
      {
        produkIds: {
          type: Schema.Types.ObjectId,
          ref: "Produks",
          required: true,
        },
        quantity: { type: Number, required: true },
        noteProduk: { type: String, default: "Tidak ada Note" },
        ukuran: { type: String, required: true },
      },
    ],
  },

  keranjangOrder: {
    item: [
      {
        produkIds: {
          type: Schema.Types.ObjectId,
          ref: "Produks",
        },
        quantity: { type: Number },
        noteProduk: { type: String, default: "Tidak ada Note" },
        ukuran: { type: String },
      },
    ],
    waktuBatasPembayaran: { type: String },
  },
});

UsersShema.plugin(mongooseUniqueValidator);
export default mongoose.model("Users", UsersShema);
