(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'Outdoola',
        name: 'Lisa Doe'
      };
      $scope.pageTransitionOpts = [
        {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'horizontal',
        fixedHeader: true,
        fixedSidebar: false,
        pageTransition: $scope.pageTransitionOpts[0]
      };
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
      return $scope.color = {
        primary: '#248AAF',
        success: '#3CBC8D',
        info: '#29B7D3',
        infoAlt: '#666699',
        warning: '#FAC552',
        danger: '#E9422E'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', 'simpleLogin', 'fbutil', function ($scope, simpleLogin, fbutil) {

    // setting up our logout
    $scope.logout = function() {
      simpleLogin.logout();
    };

    // Filling in our User
    simpleLogin.getUser().then(function(user) {
      $scope.user = user;
      user = user;
      // Loading up this User's Profile
      if(user) {
        loadProfile(user);
      }
    });

    // Uploading a user's profile
    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }

  }]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {}]);

}).call(this);

//# sourceMappingURL=main.js.map
