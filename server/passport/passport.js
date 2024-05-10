import passport from "passport";
import LocalStrategy from "passport-local";
import AdminModal from "../models/admin-model.js";

import { verifyPassword } from "../services/auth-service.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (!email) {
          return done(null, false, { message: "Incorrect email." });
        }
        const user = await AdminModal.findOne({ email });

        const data = await verifyPassword(password, user.password);

        if (!data) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await AdminModal.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
