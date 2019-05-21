const app = angular.module('TravelApp', []);

app.controller('MainController', ['$http', function($http) {
  console.log('ONLOAD');
  const controller = this;

  this.indexOfEditFormToShow = null;
  // this.indexOfDetailsToShow = null;
  this.showInfo = false;
  this.showDetails = function() {
      this.showInfo = !this.showInfo;
  }

  this.includePath = 'partials/listings.html';

  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html';
  }

  this.createLocation = function() {
    $http({
      method: 'POST',
      url: '/travels',
      data: {
        type: this.type,
        location: this.location,
        image: this.image,
        activities: this.activities,
        food: this.food,
        date: this.date
      }
    }).then(function(response) {
      controller.changeInclude('listings');
      controller.getLocations();
    }, function() {
      console.log('error');
    });
  };

  this.getLocations = function() {
    $http({
      method: 'GET',
      url: '/travels',
    }).then(function(response) {
      controller.travels = response.data
    }, function() {
      console.log('error');
    });
  };

  this.deleteLocation = function(place) {
    $http({
      method: 'DELETE',
      url: '/travels/' + place._id
    }).then(
      function(response) {
        controller.getLocations();
      },
      function(error) {
        console.log('error');
      }
    );
  }

  this.editLocation = function(place) {
    $http({
      method: 'PUT',
      url: '/travels/' + place._id,
      data: {
        type: this.updatedType,
        location: this.updatedLocation,
        image: this.updatedImage,
        activities: this.updatedActivities,
        food: this.updatedFood,
        date: this.updatedDate
      }
    }).then(
      function(response) {
        console.log(response);
        controller.getLocations();
        controller.indexOfEditFormToShow = null;
      },
      function(error) {
        console.log('error');
      }
    );
  }

  this.createUser = function() {
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      controller.username = null;
      controller.password = null;
      controller.userCreated = response.config.data.username;
    }, function(error) {
      console.log(error);
    })
  }

  this.logOut = function() {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function(response) {
      controller.loggedInUsername = null;
    }, function(error) {
      console.log(error);
    });
  }

  this.logIn = function() {
    console.log('login is running');
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.existingUsername,
        password: this.existingPassword
      }
    }).then(function(response) {
      console.log(response);
      controller.loggedInUsername = response.config.data.username;
      controller.existingUsername = null;
      controller.existingPassword = null;
      controller.getLocations();
      controller.changeInclude('listings');
    }, function(error) {
      console.log(error);
    })
  }


  this.getLocations();

}]);
