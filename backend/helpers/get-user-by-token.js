import jwt from "jsonwebtoken";

import prisma from "../models/prismaClient.js";

const getUserByToken = async (token) => {
  const secret = process.env.JWT_SECRET;

  const decoded = jwt.verify(token, secret);

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  return user;
};

export default getUserByToken;
