import express from 'express';
import path from 'path';
import dirHelper from '../../utils/dirHelper';
import imgproc from '../../modules/imgproc';

const resize = express.Router();

resize.get('/', async (req, res) => {
  const query = req.query;
  const filename = query.filename;
  let finalImage = '';
  let hasImage: boolean;
  if (filename != undefined) {
    const imgDir = path.resolve(__dirname, '../../public/images');
    const files = await dirHelper.ListDirectory(imgDir);
    const setFiles = new Set(files);
    hasImage = setFiles.has(filename as string);

    if (hasImage) {
      const inputPath = path.join(imgDir, filename as string);
      const size = (await imgproc.shape(inputPath)) as [number, number];
      const actualWidth = size[0];
      const actualHeight = size[1];

      const width = query.width;
      const height = query.height;
      if (width != undefined || height != undefined) {
        const outDir = path.resolve(__dirname, '../../public/thumbnails');
        const outputPath = path.join(outDir, filename as string);

        let resizeWidth = 0;
        let resizeHeight = 0;

        if (width == undefined && height != undefined) {
          // if only height is specified
          resizeHeight = parseInt(height as string);
          resizeWidth = Math.round((resizeHeight / actualHeight) * actualWidth);
        } else if (width != undefined && height == undefined) {
          // if only width is specified
          resizeWidth = parseInt(width as string);
          resizeHeight = Math.round((resizeWidth / actualWidth) * actualHeight);
        } else {
          // both are specified
          resizeWidth = parseInt(width as string);
          resizeHeight = parseInt(height as string);
        }

        const writtenPath = await imgproc.resize(
          inputPath,
          outputPath,
          resizeWidth,
          resizeHeight
        );
        if (writtenPath != null) {
          finalImage = path.join('thumbnails', filename as string);
        }
      } else {
        finalImage = path.join('images', filename as string); // if valid filename, but without width/height, display raw image
      }
    } else {
      hasImage = false; // specified filename not found in `/public/images`
    }
  } else {
    hasImage = false; // filename query is undefined
  }
  res.render('resize', { data: { filename: finalImage, hasImage: hasImage } });
});

export default resize;
