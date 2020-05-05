/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import passport from 'passport';
import Fs from 'passport-facebook';
import Gs from 'passport-google-oauth';
import MockPass from '@passport-next/passport-mocked';

dotenv.config();

let FacebookStrategy;
let GoogleStrategy;
if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'localTest') {
  FacebookStrategy = Fs.Strategy;
  GoogleStrategy = Gs.OAuth2Strategy;
} else {
  FacebookStrategy = MockPass.Strategy;
  GoogleStrategy = MockPass.OAuth2Strategy;
}

const getProfile = (accessToken, refreshToken, profile, done) => {
  try {
    const firstName = profile._json.first_name || profile._json.given_name;
    const lastName = profile._json.last_name || profile._json.family_name;
    const email = profile.emails[0].value;
    const user = { firstName, lastName, email };
    done(null, user);
  } catch (error) {
    done(error);
  }
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      name: 'facebook',
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/facebook/redirect',
      profileFields: ['emails', 'name']
    },
    getProfile
  )
);

passport.use(
  new GoogleStrategy(
    {
      name: 'google',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/redirect'
    },
    getProfile
  )
);
