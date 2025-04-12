const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../services/users.services"); 
const db = require("./database")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(new LocalStrategy(
  { usernameField: "email" }, // Sử dụng email thay vì username
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email }); // Tìm user theo email
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      // console.log("User logged in (local):", user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.use(
  new GoogleStrategy(
    {      
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db("users").where({ google_id: profile.id }).first();

        if (!user) {
          // Nếu user chưa tồn tại -> Thêm vào database
          const newUser = {
            google_id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          };

          const [userId] = await db("users").insert(newUser).returning("id");
          newUser.id = userId;
          return done(null, newUser);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user (lưu ID vào session hoặc JWT)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (lấy thông tin user từ ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db("users").where({ id }).first();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
