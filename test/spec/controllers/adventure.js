'use strict';

describe('Controller: AdventureCtrl', function () {

  // load the controller's module
  beforeEach(module('outdoolacomApp'));

  var AdventureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdventureCtrl = $controller('AdventureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
