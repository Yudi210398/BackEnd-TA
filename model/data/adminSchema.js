import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;
const adminSchema = new Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: {
    type: String,
    unique: true,
  },
  expiresAt: {
    type: Date,
  },
});

adminSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Admin", adminSchema);
