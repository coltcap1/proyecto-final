const validateImgurUrls = (req, res, next) => {
  const body = req.body;

  const imgurRegex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;

  for (const key in body) {
    if (key.toLowerCase().endsWith('url')) {
      const value = body[key];

      if (typeof value !== 'string' || !imgurRegex.test(value)) {
        return res.status(400).json({
          error: `La propiedad "${key}" debe ser una URL válida de Imgur.`
        });
      }
    }
  }

  next();
};

module.exports = {
  validateImgurUrls
}