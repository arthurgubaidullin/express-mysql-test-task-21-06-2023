import * as crypto from 'node:crypto';

export function generate() {
  return crypto.randomBytes(64).toString('hex');
}
