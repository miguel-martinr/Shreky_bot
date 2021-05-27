import { Telegraf } from 'telegraf';
import { ImgEditor } from '../ImgHandling';
import { getBase64, saveImageFromUrl, saveImg } from '../utils';
import { exec } from 'child_process';
require('dotenv').config();


const shrekyBot = new Telegraf(process.env.BOT_API as string);

shrekyBot.on('photo', async (ctx) => {
  const editor = new ImgEditor();
  const photos = ctx.update.message.photo;
  const {file_id: fileID} = photos[photos.length - 1];
  
  const fileUrl = await ctx.telegram.getFileLink(fileID);
  console.log(fileUrl.toString());

  const tempName = './media/received/' + Date.now().toString();
  saveImageFromUrl(fileUrl.toString(), tempName, (imgPath) => {
    console.log(imgPath);
    editor.shrekify(imgPath).then((shrekified) => {
      ctx.replyWithPhoto({source: saveImg(shrekified, './media/')});
      exec('rm ./media/received/*');
    });
    
  });  
});

shrekyBot.on('message', (ctx) => {
  ctx.reply(`Hola ${ctx.message.from.username}!, envíame una foto y mira la magia 🐟`);
});

shrekyBot.launch();

