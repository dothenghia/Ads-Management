const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const admin = require('./firebaseAdmin');
const jwtSecret = 'suffering';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const userSnapshot = await admin.firestore().collection('accounts').where('username', '==', username).get();

      if (userSnapshot.empty) {
        return done(null, false);
      }

      const user = userSnapshot.docs[0].data();

      if (user.password !== password) {
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
    const user = await admin.firestore().collection('accounts').where('id', '==', jwt_payload.sub).get();
    if (!user.exists) {
      return done(null, false);
    }

    return done(null, user.data());
  } catch (error) {
    return done(error);
  }
}));

const generateToken = (user) => {
  return jwt.sign({ sub: user.id, accountType: user.role }, jwtSecret, {
    expiresIn: '1h', // Token expiration time
  });
};
//https://www.passportjs.org/packages/passport-google-oauth20/
passport.use(new GoogleStrategy({
  clientID: '131586726827-29e0i882m9v3ojjdeqhdgshq7maaiqao.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const userSnapshot = await admin.firestore().collection('accounts').where('email', '==', profile.emails[0].value).get();

      if (userSnapshot.empty) {
        // If the user is not found in the Firestore collection, you can choose to create a new account or handle it as needed.
        return cb(null, false);
      }

      const user = userSnapshot.docs[0].data();
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));

module.exports = { passport, generateToken };
