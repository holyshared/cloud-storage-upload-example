import express, { Request, Response, NextFunction } from "express";
import { signedUrl } from "./storage";
import { signedCookie } from "./signed-cookie";
import { signedURLOfImage } from "./signed-url";
import { SIGNED_URL_DOMAIN, SIGNED_URL_PATH, SIGNED_URL_MAX_AGE_SECONDS } from "./signed";

const app = express();

app.set('trust proxy', true);
app.set('view engine', 'pug');

app.set('views', './src/views');

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request<{}, {}, { name: string }>, res: Response, next: NextFunction) => {
  res.cookie('Cloud-CDN-Cookie', signedCookie(SIGNED_URL_MAX_AGE_SECONDS), {
    domain: SIGNED_URL_DOMAIN,
    path: SIGNED_URL_PATH,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });

  res.render("index.pug", { signedUrl: signedURLOfImage("demo.jpg") });
});

app.post("/signed", (req: Request<{}, {}, { name: string }>, res: Response, next: NextFunction) => {
  signedUrl(req.body.name).then((result) => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

app.listen(process.env.PORT || 3000);
