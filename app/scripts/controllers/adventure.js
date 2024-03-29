'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:AdventureCtrl
 * @description
 * # AdventureCtrl
 * Controller of the outdoolacomApp
 */
angular.module('outdoolacomApp')
  .controller('AdventureCtrl', [ '$scope', '$window', 'simpleLogin', 'fbutil', '$timeout', '$http', '$log', '$location', function ($scope, $window, simpleLogin, fbutil, $timeout, $http, $log, $location) {


// **** Adventure Stuff ****

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.adventures = fbutil.syncArray('adventures', {limit: 20});

    // display any errors
    $scope.adventures.$loaded().catch(alert);

    // provide a method for adding an adventure
    $scope.addAdventure = function(newAdventure) {

      getLatLong(newAdventure.address, newAdventure.city, newAdventure.state, newAdventure.zip).then(function(){

      // Checking for required feilds
      if (
        newAdventure.name &&
        newAdventure.description &&
        newAdventure.picture &&
        newAdventure.price &&
        newAdventure.size
        ) {
          // adding in userid
          $scope.profile.id = $scope.user.uid;
          // add a user to the adventure
          newAdventure.owner = $scope.profile;
          // setting the default booked value to false;
          newAdventure.booked = false;
          // Adding in lat & long
          newAdventure.latLong = $scope.latLong;

          // push an adventure to the end of the array
          $scope.adventures.$add( newAdventure )
            .then(function(ref) {
              // go to the congrats/final step
              $scope.step('stepFour');
              // make new adventure available
              $scope.newSavedAdventure = ref.key();
            })

            // display any errors
            .catch(alert);
      }
      });
    };

    // // Have a link to go to a link
    // $scope.toAdventure = function(adventure) {
    //   // console.log(adventure);
    //   // $location.url('/adventures/');
    // }

// **** End Adventure Stuff ****

    // Setting up address dropdown
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


    $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];


    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }


// **** Booking Stuff ****

    // synchronize a read-only, synchronized array of reviews, limit to most recent 10
    $scope.bookings = fbutil.syncArray('bookings', {limit: 10});

    // display any errors
    $scope.bookings.$loaded().catch(alert);

// **** End Booking Stuff ****


    // **** Datepicker Stuff ****
      $scope.today = function() {
        return $scope.dt = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        return $scope.dt = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return $scope.opened = true;
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];

    // **** End Datepicker Stuff ****


    // **** This is the wizard logic ****
      $scope.wizardForm = {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false
      }
      $scope.step = function(step) {
        if (step == "stepOne") {
          $scope.wizardForm.stepOne = true;
          $scope.wizardForm.stepTwo = false;
          $scope.wizardForm.stepThree = false;
          $scope.wizardForm.stepFour = false;
        }
        if  (step == "stepTwo") {
          $scope.wizardForm.stepOne = false;
          $scope.wizardForm.stepTwo = true;
          $scope.wizardForm.stepThree = false;
          $scope.wizardForm.stepFour = false;
        }
        if  (step == "stepThree") {
          $scope.wizardForm.stepOne = false;
          $scope.wizardForm.stepTwo = false;
          $scope.wizardForm.stepThree = true;
          $scope.wizardForm.stepFour = false;
        }
        if  (step == "stepFour") {
          $scope.wizardForm.stepOne = false;
          $scope.wizardForm.stepTwo = false;
          $scope.wizardForm.stepThree = false;
          $scope.wizardForm.stepFour = true;
        }
      }
    // **** End This is the wizard logic ****


// **** Helper Methods ****


  // **** Uploading a user's profile ****

    // Filling in our User
    simpleLogin.getUser().then(function(user) {
      $scope.user = user;
      user = user;
      // Loading up this User's Profile
      loadProfile(user);
    });

    // Loading up the user's profile via the firebase util (fb.util)
    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }

    $scope.alertMe = function() {
      setTimeout(function() {
        $window.alert('You\'ve selected the alert tab!');
      });
    };

  // **** End Uploading a user's profile ****



    // This allows a user to search for any address, then catch that adress to put into an adventure.
    $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };


    // This allows a user to search for any address, then catch that adress to put into an adventure.
    var getLatLong = function(address, city, state, zip) {
      var address = address + city + state + zip;
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address
        }
      }).then(function(response){
        $scope.latLong = response.data.results[0].geometry.location;
        // return response.data.results[0].geometry.location;
      });
    };

// **** End Helper Methods ****

  }]);
