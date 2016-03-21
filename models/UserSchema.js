var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;