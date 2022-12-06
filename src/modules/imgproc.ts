import sharp from 'sharp';
import dirHelper from '../utils/dirHelper';

async function resize(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<string | null> {
  try {
    dirHelper.createDirIfNotExists(outputPath);
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
}

async function shape(inputPath: string): Promise<[number, number] | null> {
  try {
    const meta = await sharp(inputPath).metadata();
    const imgWidth = meta.width;
    const imgHeight = meta.height;
    if (imgWidth != undefined && imgHeight != undefined) {
      return [imgWidth, imgHeight];
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
}

export default { resize, shape };
