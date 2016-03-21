var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  }
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;