const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

// Configure multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "OPEN_BOOK", // Optional - specify the folder where you want to store the image
  },
});
const upload = multer({ storage: storage });

// Middleware to handle image upload
const uploadImage = (req, res, next) => {
  // Use the middleware to handle single file upload
  upload.single("book_cover")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Error uploading image" });
    } else if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    // If no errors, proceed to next middleware or route handler
    next();
  });
};

module.exports = uploadImage;
