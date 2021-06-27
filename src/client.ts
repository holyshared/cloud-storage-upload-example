import loadImage from "blueimp-load-image";

const signedURL = (name: string) => {
  return fetch("/signed", {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  }).then((response) => {
    return response.json();
  });
};

const uploadFile = (url: string, file) => {
  return fetch(url, {
    method: "put",
    headers: {
      'content-type': "image/jpeg"
    },
    body: file,
  }).then((response) => {
    return response.json();
  });
};



document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload"); 
  upload.addEventListener("change", (evt: Event) => {
    if (evt.target instanceof HTMLInputElement) {
      const file = evt.target.files[0];
      loadImage(file, (image: HTMLImageElement, data) => {
        const canvas = document.createElement("canvas"); 
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob: Blob) => {
          signedURL(file.name).then(({ url }) => {
            return uploadFile(url, blob);
          }).then(() => {
            console.log("uploaded");
          }).catch(err => {
            console.log(err.stack);
          });
        }, "image/jpeg", 0.85);
      });
    }
  });
});