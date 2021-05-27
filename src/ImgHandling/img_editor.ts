import mergeImages = require('merge-images');
import { Canvas, Image } from 'canvas';
import { randomNumberBetween, saveImg } from '../utils';
import imageSize = require('image-size');

const sizeOf = imageSize.imageSize;
const IMG_DIR = './src/ImgHandling/media/';
const IMG_SETS = [
  { prefix: 'shrek', quantity: 4, delim: '-', ext: '.png' },
  // { prefix: 'donkey', quantity: 1, delim: '-', ext: '.png' },
];

export class ImgEditor {
  constructor() {

  }

  async shrekify(imgPath: string) {
    const randImg = this.getRandomImg();

    let background;
    let layer;
    
    if ((sizeOf(imgPath).height || 0) > (sizeOf(randImg).height || 0)) {
      
      background = imgPath;
      layer = randImg;
    } else {
      background = randImg;
      layer = imgPath;
    }
    
    
    const layerPosition = this.getRandomPositions(background, layer);

    const shrekifiedImg = await mergeImages([
      {src: background},
      {src: layer, x: layerPosition.x, y: layerPosition.y }
    ], {
      Canvas: Canvas,
      Image: Image
    });

    return shrekifiedImg;
  }

  private getRandomImg(): string {
    const imgSet = IMG_SETS[randomNumberBetween(0, IMG_SETS.length)];
    const randNum = randomNumberBetween(0, imgSet.quantity);
    return IMG_DIR + imgSet.prefix + imgSet.delim + randNum + imgSet.ext;
  }

  private getRandomPositions(background: string, shrek: string): {x: number, y: number} {
    const bgDims = sizeOf(background);
    const shrekDims = sizeOf(shrek);

    const x = randomNumberBetween(0, (bgDims.width || 0) - (shrekDims.width || 0));
    const y = randomNumberBetween(0, (bgDims.height || 0) - (shrekDims.height || 0));
    return {x: x, y: y};
  }

}

