import imgproc from '../../modules/imgproc';
import path from 'path';
import fs from 'fs';

describe('Test shape function', () => {
  it('should return null for invalid image path input', async () => {
    const result = await imgproc.shape('invalid_image_path');
    expect(result).toBe(null);
  });
  it('should return images size [width, height] for valid image path input', async () => {
    const input = path.resolve(
      __dirname,
      '../../public/images/icelandwaterfall.jpg'
    );
    const result = await imgproc.shape(input);
    expect(result).toEqual([1920, 1273]);
  });
});

describe('Test resize function', () => {
  it('should return null for invalid image path input', async () => {
    const result = await imgproc.resize(
      'invalid_image_path',
      'output',
      100,
      100
    );
    expect(result).toBe(null);
  });
  it('should return output path string for valid image path input', async () => {
    const input = path.resolve(
      __dirname,
      '../../public/images/icelandwaterfall.jpg'
    );
    const output = path.resolve(
      __dirname,
      '../../public/thumbnails/icelandwaterfall.jpg'
    );
    createDirIfNotExists(output);
    const result = await imgproc.resize(input, output, 100, 100);
    expect(result).toEqual(output);
  });
  it('should correctly resize the input image by the width and height argument', async () => {
    const input = path.resolve(
      __dirname,
      '../../public/images/icelandwaterfall.jpg'
    );
    const output = path.resolve(
      __dirname,
      '../../public/thumbnails/icelandwaterfall.jpg'
    );
    createDirIfNotExists(output);
    const result = await imgproc.resize(input, output, 100, 100);
    const size = await imgproc.shape(result as unknown as string);
    expect(size).toEqual([100, 100]);
  });
});

function createDirIfNotExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
