import * as crypto from 'node:crypto';

const KEY_LENGTH = 64;

export function hash(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString('hex'));
    })
  );
}
