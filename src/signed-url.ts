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
  const signature =  crypto.createHmac('sha1', Buffer.from(signed.SIGNED_URL_KEY_VALUE, 'base64'))
    .update(signURL)
    .digest('base64')
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  segments.push(`&Signature=${signature}`);

  const singedQuery = segments.join('');

  return `${url}${singedQuery}`;
}