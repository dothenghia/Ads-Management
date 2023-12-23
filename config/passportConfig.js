const passport = require('passport');
const bcryptConfig = require('../config/bcryptConfig');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const jwt = require('jsonwebtoken');
const admin = require('./firebaseAdmin');
const jwtSecret = 'suffering';
const db = admin.firestore()
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const userSnapshot = await db.collection('accounts').where('username', '==', username).get();

      if (userSnapshot.empty) {
        return done(null, false);
      }

      const user = userSnapshot.docs[0].data();
      
      if (!bcryptConfig.checkPassword(password,user.hashedpassword)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await db.collection('accounts').where('id', '==', jwt_payload.sub).get();
    if (!user.exists) {
      return done(null, false);
    }

    return done(null, user.data());
  } catch (error) {
    return done(error);
  }
}));

const generateToken = (user) => {
  console.log(user);

  let areaId;
  if (user.role == "1") areaId = user.phuong_id;
  else if (user.role == "2") areaId = user.quan_id;
  else areaId = "Sở";
  let areaName = user.area;

  return jwt.sign({ sub: user.id, accountType: user.role, areaId, areaName, name: user.name }, jwtSecret, {
    expiresIn: '1h', // Token expiration time
  });
};
//https://www.passportjs.org/packages/passport-google-oauth20/
passport.use(new GoogleStrategy({
  clientID: '131586726827-29e0i882m9v3ojjdeqhdgshq7maaiqao.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const userSnapshot = await db.collection('accounts').where('email', '==', profile.emails[0].value).get();

      if (userSnapshot.empty) {
        return cb(null, false);
      }

      const user = userSnapshot.docs[0].data();
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));
//https://www.passportjs.org/packages/passport-facebook/
passport.use(
  new FacebookStrategy(
    {
      clientID: '1400257290595933',
      clientSecret: 'da7bd5babdf58ddedbbb077972a81299',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const userSnapshot = await db.collection('accounts').where('fbID', '==', profile.id).get();

        if (userSnapshot.empty) {
          return cb(null, false);
        }

        const user = userSnapshot.docs[0].data();
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
//https://www.passportjs.org/packages/passport-microsoft/
module.exports = { passport, generateToken };
