// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('doAwesomeThings', ['ionic', 'ngStorage'])

.controller('HomeCtrl', function($scope, $ionicActionSheet, $timeout, $ionicModal, $localStorage) {
  $scope.$storage = $localStorage.$default({
    awesomeThings: []
  });
  
  // Add an awesome thing
  $scope.addAwesomeThing = function() {
    console.log('Attempting to add awesome thing...');
    
    if(typeof $scope.awesomeThingForm.newAwesomeThing == "undefined") {
      console.log('Awesome thing was nonexistent! Aborting!');
      return;
    }
    
    var newAwesomeThing = $scope.awesomeThingForm.newAwesomeThing.trim();
    
    if(!newAwesomeThing.length) {
      console.log('Awesome thing was empty! Aborting!');
      return;
    }
    
    $scope.$storage.awesomeThings.push({
      text: newAwesomeThing,
      complete: false
    });
    
    $scope.awesomeThingForm.newAwesomeThing = '';
    
    console.log('Awesome thing added!');
  };
  
  // Edit an awesome thing
  $scope.editAwesomeThing = function() {
    console.log('Attempting to edit awesome thing...');
    
    var editedAwesomeThing = $scope.selectedThing.text.trim();
    
    if(!editedAwesomeThing.length) {
      console.log('Edit made thing empty! Deleting!');
      
      $scope.removeAwesomeThing($scope.originalSelectedThing);
      
      $scope.closeEditModal();
    }
    else {
      $scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf($scope.originalSelectedThing)].text = editedAwesomeThing;
      
      $scope.closeEditModal();
      
      console.log('Awesome thing edited!');
    }
  };
  
  // Remove a single awesome thing
  $scope.removeAwesomeThing = function(thing) {
    $scope.$storage.awesomeThings.splice($scope.$storage.awesomeThings.indexOf(thing), 1);
    console.log('Awesome thing removed!');
  };
  
  // Change completion status
  $scope.changeAwesomeThingComplete = function(thing) {
    if(!thing.complete) {
      console.log('Awesome thing completed!');
      $scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf(thing)].complete = true;
    }
    else {
      console.log('Awesome thing undone!');
      $scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf(thing)].complete = false;
    }
  };
  
  // Show the action sheet
  $scope.showActionSheet = function(thing) {
    $scope.selectedThing = $scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf(thing)];
    
    $scope.originalSelectedThing = $scope.selectedThing;
    
    var buttonText = 'Mark Not Done';
    if(!$scope.$storage.awesomeThings[$scope.$storage.awesomeThings.indexOf(thing)].complete) {
      buttonText = 'Mark Done';
    }
    
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: buttonText },
        { text: 'Edit' }
      ],
      destructiveText: 'Remove',
      cancelText: 'Cancel',
      titleText: 'Modify Awesomeness',
      cancel: function() {
        return true;
      },
      buttonClicked: function(index) {
        if(index === 0) {
          $scope.changeAwesomeThingComplete(thing);
        }
        else {
          $scope.openEditModal();
        }
        return true;
      },
      destructiveButtonClicked: function() {
        $scope.removeAwesomeThing(thing);
        return true;
      }
    });
    
    $timeout(function() {
      hideSheet();
    }, 5000);
  };
  
  // Set up the modal
  $ionicModal.fromTemplateUrl('editAwesomeThingModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  // Open the modal
  $scope.openEditModal = function() {
    $scope.modal.show();
  };
  
  // Close the modal
  $scope.closeEditModal = function() {
    $scope.modal.hide();
  };
  
  // Clean up the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
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
