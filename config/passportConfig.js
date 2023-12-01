const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const admin = require('./firebaseAdmin');
const jwtSecret = 'suffering'; // Replace with your own secret

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
    console.log(user);
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
module.exports = {passport,generateToken};
