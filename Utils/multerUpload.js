const multer = require('multer');
const path = require('path');

const UPLOAD_FOLDER = path.join(__dirname, '../images'); // Define your upload folder path

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
