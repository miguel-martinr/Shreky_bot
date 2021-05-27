import axios from "axios";
import * as fs from 'fs';
import https = require('https');

export const randomNumberBetween = (min: number = 0, max: number = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const saveImg = (img: string, outDir: string) => {
  const base64Data = img.replace(/^data:image\/png;base64,/, "");
  const imgName = outDir + Date.now().toString() + '.png';

  fs.writeFileSync(imgName, base64Data, {encoding: 'base64'});
  return imgName;
};


export const getBase64 = (url: string, cb:(base64: string) => void) => {
  return axios
      .get(url, {responseType: 'arraybuffer'})
      .then((response) => cb(Buffer.from(response.data, 'binary').toString('base64')));
};

// Node.js Function to save image from External URL.
export const saveImageFromUrl = (url: string, localPath: string, cb: (imgPath: string) => void) => {
  const fullUrl = url;
  const file = fs.createWriteStream(localPath + '.jpg');
  const request = https.get(url, (response) => {
    response.pipe(file);
    response.on('close', () => {
      cb(localPath + '.jpg');
    });
  });
};
