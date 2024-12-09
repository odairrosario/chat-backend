import bcrypt from 'bcryptjs';

export default function hashComparePassword(
  password: string,
  userPasswordToken: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, userPasswordToken, function (err, result) {
      if (err) {
        reject(err);
      }

      return resolve(result);
    });
  });
}
