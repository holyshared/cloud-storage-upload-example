import { Storage } from "@google-cloud/storage";
import dayjs from "dayjs";

const SIGNED_EXPIRES = Number(process.env.SIGNED_EXPIRES || 5);

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID
});

export const signedUrl = async (name: string): Promise<{
  url: string
}> => {
  const options = {
  };
  const expires = dayjs().add(SIGNED_EXPIRES, 'minute').toDate();

  return new Promise((resolve, reject) => {
    return storage.bucket(process.env.GCP_STORAGE_BUCKET).file(name, options).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires,
    }, (err: Error, url: string) => {
      if (err) {
        return reject(err);
      }
      resolve({
        url
      });
    });
  });
}
