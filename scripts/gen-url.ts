import { signedURL } from "../src/signed-url";
import { SIGNED_URL_MAX_AGE_SECONDS, URL_PREFIX } from "../src/signed";

console.log(signedURL(`${URL_PREFIX}demo.jpg`, SIGNED_URL_MAX_AGE_SECONDS));
