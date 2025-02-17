import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //generating token which will expire in 7days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //seding the token in cookies in httpnly cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks , cross site scripting attacks
    sameSite: "strict", // Prevent CSRF attacks, cross site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
