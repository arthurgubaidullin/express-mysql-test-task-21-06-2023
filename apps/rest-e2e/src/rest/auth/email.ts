import crypto from 'node:crypto';

export function generate(): string {
  return `test+${crypto.randomBytes(8).toString('hex')}@example.com`;
}
