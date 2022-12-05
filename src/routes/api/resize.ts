import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
  const imgFileName = 'icelandwaterfall.jpg';
  res.render('resize', { data: { filename: imgFileName } });
});

export default images;
