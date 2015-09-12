// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('doAwesomeThings', ['ionic', 'ngStorage'])

.controller('HomeCtrl', function($scope, $localStorage) {
  $scope.$storage = $localStorage.$default({
    awesomeThings: []
  });
  
  // Add an awesome thing
  $scope.addAwesomeThing = function() {
    console.log('Awesome thing added!');
    
    var newAwesomeThing = $scope.newAwesomeThing.trim();
    
    if(!newAwesomeThing.length) {
      return;
    }
    
    $scope.$storage.awesomeThings.push({
      text: newAwesomeThing,
      complete: false
    });
  };
  
  // Edit an awesome thing
  $scope.editAwesomeThing = function(thing) {
    $scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf(thing)] = {
      text: thing,
      complete: false
    };
  };
  
  // Remove a single awesome thing
  $scope.removeAwesomeThing = function(thing) {
    $scope.$storage.awesomeThings.splice($scope.$storage.awesomeThings.indexOf(thing), 1);
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});