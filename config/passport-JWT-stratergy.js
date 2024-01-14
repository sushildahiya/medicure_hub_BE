/**
 * Import required modules and dependencies
 * */ 
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

/*
* Define options for JWT authentication strategy
*/
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'healthAPI'
};

/**
 * Configure Passport to use JWT strategy
 **/ 
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    // Find the doctor in the database using the provided JWT payload
    const user = await User.findById(jwt_payload._id);
    
    // If the doctor is found, pass the doctor object to the next middleware
    if (user) {
      return done(null, user);
    } else {
      // If the doctor is not found, indicate that authentication failed
      return done(null, false);
    }
  } catch (err) {
    // Handle errors that may occur during the database query
    console.log('Error in finding user in jwt', err);
    return done(err, false);
  }
}));

// Export the configured Passport instance with the JWT strategy
module.exports = passport;
