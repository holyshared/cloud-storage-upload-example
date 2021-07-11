import crypto from 'crypto';
import dayjs from 'dayjs';
import * as signed from './signed';

export const ENCODED_URL_PREFIX = (Buffer.from(signed.URL_PREFIX))
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");

export const signedCookie = (seconds: number) => {
  const unixTimestamp = dayjs().add(seconds, 'seconds').unix();
  const input = `URLPrefix=${ENCODED_URL_PREFIX}:Expires=${unixTimestamp}:KeyName=${signed.SIGNED_URL_KEY_NAME}`;
  const signature =  crypto.createHmac('sha1', Buffer.from(signed.SIGNED_URL_KEY_VALUE, 'base64'))
    .update(input)
    .digest('base64')
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${input}:Signature=${signature}`;
}