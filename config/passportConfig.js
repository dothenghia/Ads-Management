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
  return jwt.sign({ sub: user.id, accountType: user.role }, jwtSecret, {
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
passport.use(
  new MicrosoftStrategy(
    {
      clientID: 'b2e27e9b-217c-4a4c-af51-a141250926c2',
      //clientSecret: 'tB58Q~C-fjzIDSuNLHlxyvFDObIhnDGHdRvHVa_C',
      callbackURL: 'http://localhost:3000/auth/microsoft/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const userSnapshot = await db.collection('accounts').where('microsoftEmail', '==', profile.emails[0].value).get();
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
module.exports = { passport, generateToken };
