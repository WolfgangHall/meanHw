var app = angular.module('ProductReviewApp', []);

app.controller('ProductTrackerController', function($http){
  var productTracker = this;


  productTracker.login = function() {
    productTracker.loggedIn = true;

    console.log('trying to create user');

    $http({
      method: "POST",
      url: "/user",
      data: {username: productTracker.username}
    }).then(function(result){
      console.log("user was successfully created");
      productTracker.userId = result.data._id;
      productTracker.username = result.data.username;
      productTracker.reviews = result.data.reviews;
      productTracker.products = result.data.products;
    })
  };

  productTracker.addProduct = function(){
    console.log('trying to add a product');
    $http({
      method: "POST",
      url: "/newproduct" + productTracker.userId,
      data: {
        name: productTracker.product.name,
        description: productTracker.product.description,
        price: productTracker.product.price
      }
    }).then(function(result){
      productTracker.login();
    });
  };

});