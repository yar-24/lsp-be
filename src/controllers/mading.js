const Mading = require('../models/mading');
const cloudinary = require('../middleware/cloudinary');
const asyncHandler = require('express-async-handler');

// @desc    Post mading
// @route   POST /v2/mading
// @access  Private
const createMading = asyncHandler(async (req, res) => {
  if (!req.file) {
    const err = new Error('Gambar harus diupload!!');
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      const cloudUpload = await cloudinary.uploader.upload;
      const image = await cloudUpload(req.file.path);

      const comments = {
        username: req.user.username,
        email: req.user.email,
        comment: req.body.comment,
      };

      let mading = await Mading.create({
        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        image: image.public_id,
        category: req.body.category,
        comments: comments,
      });
      await mading;
      res.status(200).json({ message: 'Berhasil diinput', mading: mading });
    } catch (error) {
      res.status(400).send(error.message);
      throw new Error('Invalid user data');
    }
  }
});

// @desc    Put mading
// @route   PUT /mading/:id
// @access  Private
const updateMading = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    const err = new Error('Gambar harus diupload!!');
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      let mading = await Mading.findById(req.params.id);

      //DELETE FILE
      const cloudDelete = await cloudinary.uploader.destroy;
      cloudDelete(mading.image);

      //POST FILE
      const cloudUpload = await cloudinary.uploader.upload;
      const image = await cloudUpload(req.file.path);

      const data = {
        title: req.body.title || mading.title,
        desc: req.body.desc || mading.desc,
        image: image.public_id || mading.image,
        category: req.body.category || mading.category,
      };

      mading = await Mading.findByIdAndUpdate(id, data, { new: true });
      res.json({ message: 'Berhasil diupdate', data });
    } catch (err) {
      res.status(400).send(err.message);
      throw new Error('Invalid user data');
    }
  }
});

// @desc    Delete mading
// @route   DELETE /mading/:id
// @access  Private
const deleteMading = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let mading = await Mading.findById(req.params.id);

    const cloudDelete = await cloudinary.uploader.destroy;
    cloudDelete(mading.image);

    mading = await Mading.findByIdAndRemove(id);
    res.status(200).json({ message: 'Berhasil dihapus' });
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error('Invalid user data');
  }
});

// @desc    Get mading
// @route   GET /mading/:id
const getMading = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let mading = await Mading.findById(id);

  if (mading) {
    res.status(200).json({
      message: 'Berhasil dipanggil',
      mading: mading,
    });
  } else {
    res.status(400).send(err.message);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get All mading
// @route   GET /mading/
const getAllMading = asyncHandler(async (req, res) => {
  const madings = await Mading.find();
  try {
    res.status(200).json({
      message: 'Berhasil dipanggil',
      madings: madings,
    });
  } catch (error) {
    res.status(400).send(err.message);
    throw new Error('Invalid credentials');
  }
});

module.exports = {
  createMading,
  updateMading,
  deleteMading,
  getMading,
  getAllMading,
};
