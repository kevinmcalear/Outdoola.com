'use strict';

/**
 * @ngdoc directive
 * @name outdoolacomApp.directive:contentEditable
 * @description
 * # contentEditable
 */

angular.module('outdoolacomApp')
  .directive('contenteditable', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function postLink(scope, element, attrs, ngModel) {
        function read() {
          ngModel.$setViewValue(element.html());
        }
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };
        element.bind('blur keyup change', function() {
          scope.$apply(read);
        });
      }
    };
  });
