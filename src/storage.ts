import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID
});

export const signedUrl = async (name: string): Promise<{
  url: string
}> => {
  const options = {
  };

  return new Promise((resolve, reject) => {
    return storage.bucket(process.env.GCP_STORAGE_BUCKET).file(name, options).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: "image/jpeg"
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
