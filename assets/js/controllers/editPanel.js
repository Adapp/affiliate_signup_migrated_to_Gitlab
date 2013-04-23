(function(app, undefined) {
  'use strict';
  
  app.controller('editPanelController', ['$scope', '$http','customFormFields', function($scope, $http, formFields) {
    $scope.formFields = formFields;
    $scope.errorState = "Show Error Text";
    $scope.errorsOn = false;


    $scope.alternateErrors = function() {
      $scope.errorsOn = !$scope.errorsOn;
      $scope.errorState = $scope.errorsOn ? 'Hide Error Text' : 'Show Error Text';
    }
  }]);

})(window.App);
