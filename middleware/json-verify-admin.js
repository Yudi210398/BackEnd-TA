import jwt from "jsonwebtoken";
import HttpError from "../model/DummyData/http-error.js";

export const jsonAdminVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const auth = req.headers.authorization.split(" ")[0] === "Cat";

    if (!auth) throw new HttpError("auth failed", 401);

    if (!token) throw new HttpError("auth failed, anda belum login", 401);

    const decode = jwt.verify(token, "admin_rahasia");
    req.dataAmin = decode;
    next();
  } catch (err) {
    const error = new HttpError(
      "auth failed, anda belum login, atau token bermasalah, coba login lagi",
      401
    );
    return next(error);
  }
};
