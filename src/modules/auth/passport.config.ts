import { Strategy as JwtStrategy } from 'passport-jwt';
import passport from 'passport';
import { Request } from 'express';
import { JWT_SECRET_KEY } from '../../config/auth.config';

const options = {
  jwtFromRequest: (req: Request) => req.cookies?.auth,
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    try {
      done(null, jwtPayload);
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
