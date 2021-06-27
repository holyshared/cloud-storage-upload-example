# clpoud-storage-upload-example

## Setup GCP

```shell
cd infra
terraform init
terraform apply
```

## Signed URL

```ts
import { signedUrl } from "./src/storage";

asignedUrl("demo.jpg").then(s => {
  console.log(s);
}).catch(err => {
  console.log(err);
});
```

## Upload file to bucket

```shell
curl -XPUT -H "Content-type: image/jpeg" --upload-file demo.jpg [URL]
```
