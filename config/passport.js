const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const admin = require('/config/firebaseAdmin');
const db = admin.firestore();
const users = db.collection('accounts');

// Local strategy for username and password login
passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const userDoc = await users.where('email', '==', username).get();
        if (userDoc.empty) {
          return done(null, false);
        }

        const user = userDoc.docs[0].data();

        if (user.password !== password) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'suffering', 
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload.user);
    }
  )
);

const generateToken = (user) => {
  return jwt.sign({ user }, 'suffering', { expiresIn: '1h' });
};

module.exports = { passport, generateToken };
