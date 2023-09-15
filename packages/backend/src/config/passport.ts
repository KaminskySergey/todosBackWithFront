import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/User';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtOptionsActivate = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
export const jwtStrategyActivate = new JwtStrategy(jwtOptionsActivate, async (jwtPayload, done) => {
  done(null, jwtPayload);
});

export const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findOneBy(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
