var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var db = 'mongodb://localhost/productReviewDB';
mongoose.connect(db);

var User = require('./models/UserSchema');
var Review = require('./models/ReviewSchema');
var Product = require('./models/ProductSchema');

app.use(logger('dev'));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());

app.get('/', function(req,res){
  res.send(index.html);
});

app.post('/user', function(req, res){
  req.body.username = req.body.username.toLowerCase();
  User.findOne({
    'username': req.body.username
  })
  .populate('products')
  .exec(function(err,user){
    if (err) {
      console.log('error');
      res.send(err);
    } else {
      if (user === null) {
        console.log(req.body);
        var newUser = new User(req.body);
        newUser.save(function(err, newUser){
          if(err) {
            console.log(err);
            res.send(err);
          } else {
            res.send(user);
          }
        })
      }
    }
  })
});


app.post('/newproduct/:id', function(req, res) {
  var productWithUserId = req.body;
  productWithUserId._user = req.params.id;

  var newProduct = new Product(productWithUserId);
  newProduct.save(function(err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      User.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          'products': doc._id
        }
      },{new:true}, function(err, updatedUser) {
        if (err) {
          console.log(err);
        } else {
          res.send(updatedUser);
        }
      });
    }
  });
});

var PORT = 3000;
app.listen(PORT, function(){
  console.log('listening on port:' + PORT);
})