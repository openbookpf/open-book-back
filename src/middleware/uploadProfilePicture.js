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
    folder: "OPEN_BOOK",
    transformation: [
      { gravity: "face", height: 200, width: 200, crop: "thumb" },
      { radius: "max" },
      { fetch_format: "auto" },
    ],
  },
});
const upload = multer({ storage: storage });

// Middleware to handle image upload
const uploadProfilePicture = (req, res, next) => {
  // Use the middleware to handle single file upload
  console.log(req.body);
  upload.single("picture")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Error uploading image" });
    } else if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    // If no errors, proceed to next middleware or route handler
    console.log(req.file);
    next();
  });
};

module.exports = uploadProfilePicture;
