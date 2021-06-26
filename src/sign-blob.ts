import { IAMCredentialsClient, protos }  from '@google-cloud/iam-credentials';

const iam = new IAMCredentialsClient();

export const signBlobFor = (seriveAccountId: string) => {
  return new Promise((resolve, reject) => {
    iam.signBlob({
      name: `projects/-/serviceAccounts/${seriveAccountId}`,
    }, (err: Error, res: protos.google.iam.credentials.v1.ISignBlobResponse, _req) => {
      if (err) {
        return reject(err);
      }
      resolve({
        keyId: res.keyId,
        signedBlob: res.signedBlob
      });
    });
  });
}
