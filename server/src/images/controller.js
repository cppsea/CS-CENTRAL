const { createSearchParams } = require("react-router-dom");
const { cloudinary1 } = require("./config");

const getImages = async (req, res) => {
  try {
    const images = await cloudinary1.api.resources();
    // res.json(images);
    console.log("9 - images/controller.js", images.resources[0]);
    res.status(200).json({
      data: images.resources[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).message(err.message);
  }
};

const getImagesById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await cloudinary1.api.resource(id);
    res.json(image);
  } catch (err) {
    console.log(err);
    res.status(404).message(err.message);
  }
};

const postImage = async (req, res) => {
  try {
    // After uploading using multer, the image file has already been processed
    // It can be accessed using req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Error uploading image",
      });
    }

    // If multer successfully parsed the file, you can proceed with Cloudinary upload
    try {
      const result = await cloudinary1.uploader.upload(req.file.path);
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: result,
      });
    } catch (uploadError) {
      console.error(uploadError);
      res.status(500).json({
        success: false,
        message: "Error uploading image to Cloudinary",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error processing file upload",
    });
  }
};

const deleteImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await cloudinary1.api.resource(id);
    if (!image) {
      res.status(404).json({
        message: "Image not found",
      });
    } else {
      await cloudinary1.api
        .delete_resources(id)
        .then((resp) => {
          console.log(resp);
          res.status(200).json({
            message: "the image was successfully deleted",
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ message: "there has been an error deleting the image" });
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getImages,
  getImagesById,
  postImage,
  deleteImageById,
};
