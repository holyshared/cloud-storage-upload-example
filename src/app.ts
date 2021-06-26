import express, { Request, Response, NextFunction } from "express";
import { signedUrl } from "./storage";

const app = express();

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signed", (req: Request<{}, {}, { name: string }>, res: Response, next: NextFunction) => {
  signedUrl(req.body.name).then((result) => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

app.listen(process.env.PORT || 3000);
