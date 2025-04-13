const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Services = require("../services/auth.services");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(new LocalStrategy(
  { usernameField: "email" }, 
  async function (email, password, done) {
    try {
      const user = await Services.findOne({ email: email }); 
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
        let user = await Services.findByGoogleId(profile.id);

        if (!user) {
          // Nếu user chưa tồn tại -> Thêm vào database
          const newUser = {
            google_id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          };

          // const [userId] = await db("users").insert(newUser).returning("id");
          const userId = await Services.createUser(newUser);
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
    const user = await Services.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
