import express from 'express';
import path from 'path';
import dirHelper from '../../utils/dirHelper';

const resize = express.Router();

resize.get('/', async (req, res) => {
  const query = req.query;
  const filename = query.filename;
  const imgDir = path.resolve(__dirname, '../../public/images');
  const files = await dirHelper.ListDirectory(imgDir);
  const setFiles = new Set(files);
  const hasImage = setFiles.has(filename as string);
  res.render('resize', { data: { filename: filename , hasImage: hasImage} });
});

export default resize;
