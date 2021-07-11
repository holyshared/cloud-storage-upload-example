import crypto from 'crypto';
import dayjs from 'dayjs';

const SIGNED_URL_KEY_NAME = process.env.SIGNED_URL_KEY_NAME;
const SIGNED_URL_KEY_VALUE = process.env.SIGNED_URL_KEY_VALUE;
const ENCODED_URL_PREFIX = (Buffer.from(process.env.SIGNED_URL_PREFIX)).toString("base64");

export const signedCookie = (day: number) => {
  const unixTimestamp = dayjs().add(day, 'day').unix();
  const input = `URLPrefix=${ENCODED_URL_PREFIX}:Expires=${unixTimestamp}:KeyName=${SIGNED_URL_KEY_NAME}`;
  const signature =  crypto.createHmac('sha1', SIGNED_URL_KEY_VALUE).update(input).digest('hex');

  return `${input}:Signature=${signature}`;
}