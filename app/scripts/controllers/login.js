'use strict';
/**
 * @ngdoc function
 * @name outdoolacomApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('outdoolacomApp')
  .controller('LoginCtrl', [ '$scope', 'simpleLogin', '$location', '$window', function ($scope, simpleLogin, $location, $window) {
    $scope.passwordLogin = function(email, pass) {
      login('password', {
        email: email,
        password: pass,
        rememberMe: true
      });
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass/*, name*/)
          .then(function() {
            $location.path('/account');
          }, function(err) {
            $scope.err = err;
          });
      }
    };

    function login(provider, opts) {
      $scope.err = null;
      simpleLogin.login(provider, opts).then(
        function() {
          $location.path('/account');
          // $route.reload();
          $window.location.reload();
        },
        function(err) {
          $scope.err = err;
        }
      );
    }

  }]);
