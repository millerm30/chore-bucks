import pkg from 'jsonwebtoken';
const { sign } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const jwtGenerator = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };
  return sign(payload, process.env.jwtSecret, { expiresIn: "4hr" });
};