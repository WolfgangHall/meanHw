var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required: true
  }
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;