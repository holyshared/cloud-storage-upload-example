import crypto from 'crypto';
import dayjs from 'dayjs';
import * as signed from './signed';

export const signedURL = (url: string, seconds: number) => {
  const unixTimestamp = dayjs().add(seconds, 'seconds').unix();

  const segments = [
    `?Expires=${unixTimestamp}`,
    `&KeyName=${signed.SIGNED_URL_KEY_NAME}`
  ];

  const signURL = `${url}${segments.join('')}`
  const keyValue = Buffer.from(signed.SIGNED_URL_KEY_VALUE, 'base64') 
  const signature =  crypto.createHmac('sha1', keyValue)
    .update(signURL)
    .digest('base64')
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  segments.push(`&Signature=${signature}`);

  const singedQuery = segments.join('');

  return `${url}${singedQuery}`;
}

export const signedURLOfImage = (url: string, seconds?: number) => signedURL(`${signed.URL_PREFIX}${url}`, seconds || signed.SIGNED_URL_MAX_AGE_SECONDS)