/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import passport from '../../modules/auth/passport.config';
import { User } from '../../modules/users/entities/user.entity';

export const expressAuthentication = async (
  req: Request,
  securityName: string
): Promise<User> => {
  if (securityName === 'jwt') {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        (err: any, user: User) => {
          if (err || !user) {
            reject(new Error('Unauthorized'));
          } else {
            req.user = user;
            resolve(user);
          }
        }
      )(req);
    });
  }
  throw new Error('Unknown securityName');
};
