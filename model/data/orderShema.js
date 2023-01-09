import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  produks: [
    {
      produk: { type: Schema.Types.ObjectId, ref: "Produks", required: true },
      quantity: { type: Number, required: true },
      noteProduk: { type: String, required: true },
      ukuran: { type: String, required: true },
    },
  ],
  totalHarga: { type: Number, required: true },
  valdisaiTranfer: {
    statusTranfer: { type: String },
    suksesTransfer: { inputResi: { type: String } },
    failedTransfer: { alasanBatal: { type: String } },
  },
  buktiTranfer: { type: String, required: true },
  tanggal: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

orderSchema.plugin(mongooseUniqueValidator);
export default mongoose.model("Orders", orderSchema);
