const multer = require('multer');
const { v4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const [fileExtension] = file.originalname.split('.').slice(-1);
    const filename = `${v4()}.${fileExtension}`;
    cb(null, filename);
  },
});

module.exports = multer({ storage: storage });
