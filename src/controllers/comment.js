const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

// @desc    Post comment
// @route   POST /comment
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  try {
    let comment = await Comment.create({
      id: req.user.id,
      idMading: req.body.idMading,
      email: req.user.email,
      username: req.user.username,
      comment: req.body.comment,
    });
    await comment;
    res.status(200).json({ message: 'Berhasil diinput', comment: comment });
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error('Invalid user data');
  }
});

// @desc    Get All comment
// @route   GET /comment/
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();
  try {
    res.status(200).json({
      message: 'Berhasil dipanggil',
      comments: comments,
    });
  } catch (error) {
    res.status(400).send(err.message);
    throw new Error('Invalid credentials');
  }
});

// @desc    Delete comment
// @route   DELETE /comment/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let comment = await Comment.findById(req.params.id);

    comment = await Comment.findByIdAndRemove(id);
    res.status(200).json({ message: 'Berhasil dihapus' });
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
};
