import { signedCookie, SIGNED_URL_MAX_AGE_SECONDS } from "../src/signed-cookie";

console.log(signedCookie(SIGNED_URL_MAX_AGE_SECONDS));