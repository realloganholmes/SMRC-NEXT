import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import { connectToDatabase } from "./db";

export const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    await connectToDatabase();
    const session = JSON.parse(sessionCookie);
    const user = await User.findById(session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return user;
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const protect = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const user = await authenticateUser(req, res);
  if (!user) return;
  req.body.user = user;
  return next();
};

export const protectAdmin = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const user = await authenticateUser(req, res);
  if (!user || !user.admin) {
    return res.status(403).json({ message: "Access denied" });
  }
  req.body.user = user;
  return next();
};

export const protectCoolerAdmin = async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const user = await authenticateUser(req, res);
  if (!user || (!user.admin && !user.coolerAdmin)) {
    return res.status(403).json({ message: "Access denied" });
  }
  req.body.user = user;
  return next();
};
