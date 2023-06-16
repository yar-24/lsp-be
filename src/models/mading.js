const mongoose = require('mongoose');

const madingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    image: {
      type: String,
    },
    desc: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
    },
    comments: [Object],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Mading', madingSchema);
