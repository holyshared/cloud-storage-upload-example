import crypto from 'crypto';
import dayjs from 'dayjs';

export const SIGNED_URL_KEY_NAME = process.env.SIGNED_URL_KEY_NAME;
export const SIGNED_URL_KEY_VALUE = process.env.SIGNED_URL_KEY_VALUE;

export const SIGNED_URL_MAX_AGE_SECONDS = Number(process.env.SIGNED_URL_MAX_AGE_SECONDS); 
export const SIGNED_URL_DOMAIN = process.env.SIGNED_URL_DOMAIN;
export const SIGNED_URL_PATH = process.env.SIGNED_URL_PATH;

export const ENCODED_URL_PREFIX = (Buffer.from(`https://${SIGNED_URL_DOMAIN}${SIGNED_URL_PATH}`))
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");

export const signedCookie = (seconds: number) => {
  const unixTimestamp = dayjs().add(seconds, 'seconds').unix();
  const input = `URLPrefix=${ENCODED_URL_PREFIX}:Expires=${unixTimestamp}:KeyName=${SIGNED_URL_KEY_NAME}`;
  const signature =  crypto.createHmac('sha1', SIGNED_URL_KEY_VALUE)
    .update(input)
    .digest('base64')
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${input}:Signature=${signature}`;
}