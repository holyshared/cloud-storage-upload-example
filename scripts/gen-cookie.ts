import { signedCookie } from "../src/signed-cookie";
import { SIGNED_URL_MAX_AGE_SECONDS } from "../src/signed";

console.log(signedCookie(SIGNED_URL_MAX_AGE_SECONDS));