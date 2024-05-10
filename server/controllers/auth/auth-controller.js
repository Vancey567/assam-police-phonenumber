import AdminModal from "../../models/admin-model.js";
import passport from "../../passport/passport.js";

export function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    passport.authenticate("local", (err, user, info, status) => {
      if (err) {
        console.log(info)
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      return res.status(200).json({ message: "Login successful" });
    })(req, res, next);
  } catch (error) {
    console.error("Error updating object:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/"); // This works but couldn't go to / route
  });
}
