const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    idMading: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('comment', commentSchema);
