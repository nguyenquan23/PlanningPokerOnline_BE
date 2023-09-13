import passport from 'passport';
import GoogleOAuth2 from 'passport-google-oauth2';
import { CLIENT_ID, CLIENT_SECRET } from '../../../config';
import { UserService } from '../userService';
import { ROUTES } from '../../../constants/routes';

const GoogleStrategy = GoogleOAuth2.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: ROUTES.AUTH.GOOGLE_CALLBACK_FULLPATH,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const data = profile._json;
      let user = await UserService.findGoogleOAuthUser(data.email);
      if (!user) user = await UserService.createGoogleOAuthUser(data);
      done(null, user._id);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
