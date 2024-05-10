// const bcrypt = require('bcrypt');
import { hashPassword } from "../../services/auth-service.js";

import AdminModal from "../../models/admin-model.js";

export function getAdmins(req, res) {}

export async function createAdmin(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields must are required" });
  }

  try {
    //  Crypt Password
    const cryptpassword = await hashPassword(password);

    if (!cryptpassword) {
      return res.status(400).json({ message: "Password Issue" });
    }

    // Save to DB
    const admin = new AdminModal({
      name,
      email,
      password: cryptpassword,
    });

    const user = await admin.save();

    res
      .status(201)
      .json({ message: "Logged in successfully!!", user })
      .redirect("/login");
  } catch (err) {
    console.error(err);
    res.redirect("/signup");
  }
}

export function getAdminDetail(req, res) {}
