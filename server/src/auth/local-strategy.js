import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../database/schemas/user.mjs";
import { comparePasswords } from "./hash.mjs";

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  try {
    const user = User.findOne({ email: email });
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) throw new Error("User not found");
        if (!comparePasswords(password, user.password))
          throw new Error("Password incorrect");

        done(null, user);
      } catch (e) {
        done(e, null);
      }
    }
  )
);
