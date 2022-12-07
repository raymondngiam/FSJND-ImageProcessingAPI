import express from 'express';
import path from 'path';
import dirHelper from '../../utils/dirHelper';
import imgproc from '../../modules/imgproc';

const resize = express.Router();

resize.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    console.log('');
    console.log(`request: ${req.url}`);
    const query = req.query;
    const filename = query.filename;
    let finalImage = '';
    let hasImage: boolean;
    let hasError = false;
    let errorMessage = '';
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
          let resizeWidth = 0;
          let resizeHeight = 0;

          if (width == undefined && height != undefined) {
            // if only height is specified
            resizeHeight = parseInt(height as string);
            resizeWidth = Math.round(
              (resizeHeight / actualHeight) * actualWidth
            );
          } else if (width != undefined && height == undefined) {
            // if only width is specified
            resizeWidth = parseInt(width as string);
            resizeHeight = Math.round(
              (resizeWidth / actualWidth) * actualHeight
            );
          } else {
            // both are specified
            resizeWidth = parseInt(width as string);
            resizeHeight = parseInt(height as string);
          }

          // check for valid parsed integer
          if (Number.isNaN(resizeWidth) || Number.isNaN(resizeHeight)) {
            errorMessage =
              "Invalid input! Please provide 'width' or 'height' in numbers.";
            hasError = true;
          } else {
            const outDir = path.resolve(__dirname, '../../public/thumbnails');
            const splitted = (filename as string).split('.');
            const name = splitted[0];
            const ext = splitted[1];
            const outputName = `${name}_${resizeWidth}_${resizeHeight}.${ext}`;
            const outputPath = path.join(outDir, outputName);

            // check for cached images
            const files = await dirHelper.ListDirectory(outDir);
            const filesSet = new Set(files);
            const hasCached = filesSet.has(outputName);

            if (!hasCached) {
              const writtenPath = await imgproc.resize(
                inputPath,
                outputPath,
                resizeWidth,
                resizeHeight
              );
              if (writtenPath == null) {
                hasError = true;
                console.error('Failed in image resizing.');
              } else {
                console.log('Serve newly resized image.');
              }
            } else {
              console.log('Serve cached image.');
            }
            finalImage = path.join('thumbnails', outputName);
            console.log(`Image filename: ${finalImage}`);
          }
        } else {
          errorMessage = "Invalid input! Please provide 'width' or 'height'"; // if valid filename, but without width/height
          hasError = true;
        }
      } else {
        errorMessage = 'Invalid image file name!'; // specified filename not found in `/public/images`
        hasError = true;
      }
    } else {
      errorMessage = 'Filename not specified in query!';
      hasError = true; // filename query is undefined
    }
    res.render('resize', {
      data: {
        filename: finalImage,
        hasError: hasError,
        errorMessage: errorMessage
      }
    });
  }
);

export default resize;
