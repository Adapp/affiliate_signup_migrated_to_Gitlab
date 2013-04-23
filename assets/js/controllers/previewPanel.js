(function(app, undefined) {
  'use strict';
  app.controller('previewPanelController', ['$scope', 'customFormFields', function($scope, formFields) {
    
    $scope.formFields = formFields;
  }]);

})(window.App);
