import express, { Request, Response, NextFunction } from "express";
import { Storage } from "@google-cloud/storage";
import dayjs from "dayjs";

const SIGNED_EXPIRES = Number(process.env.SIGNED_EXPIRES || 5);

const storage = new Storage({});

const app = express();

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signed", (req: Request<{}, {}, { name: string }>, res: Response, next: NextFunction) => {
  const options = {
    userProject: process.env.GCP_PROJECT_ID
  };

  const expires = dayjs().add(SIGNED_EXPIRES, 'minute').toDate()

  storage.bucket(process.env.GCP_STORAGE_BUCKET).file(req.body.name, options).getSignedUrl({
    action: 'write',
    expires,
  }, (err: Error, url: string) => {
    if (err) {
      return next(err);
    }
    res.json({
      url
    });
  });
});

app.listen(process.env.PORT || 3000);
