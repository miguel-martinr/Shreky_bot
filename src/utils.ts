export const randomNumberBetween = (min: number = 0, max: number = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const saveImg = (img: string, outDir: string) => {
  const base64Data = img.replace(/^data:image\/png;base64,/, "");

  require("fs").writeFile(outDir + Date.now().toString() + '.png', base64Data, 'base64', (err: Error) => {
    console.log(err);
  });
};

