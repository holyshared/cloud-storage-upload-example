export const SIGNED_URL_KEY_NAME = process.env.SIGNED_URL_KEY_NAME;
export const SIGNED_URL_KEY_VALUE = process.env.SIGNED_URL_KEY_VALUE;

export const SIGNED_URL_MAX_AGE_SECONDS = Number(process.env.SIGNED_URL_MAX_AGE_SECONDS); 
export const SIGNED_URL_DOMAIN = process.env.SIGNED_URL_DOMAIN;
export const SIGNED_URL_PATH = process.env.SIGNED_URL_PATH;

export const URL_PREFIX = `https://${SIGNED_URL_DOMAIN}${SIGNED_URL_PATH}/`
