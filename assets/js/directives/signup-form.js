(function(ng, undefined) {
  'use strict';

  ng.module('signup.directives').directive('signupForm', ['customFormFields', function(formFields) {

    return {
      'restrict': 'A',
      'scope': false,
      'link': function(scope, el, attrs) {

        el.bind('submit', function(e) {
          if(!formFields.networkId) {
            e.preventDefault();
            alert('You must enter the Network ID to proceed.');
          }
        });
      }
    };
  }]);

})(angular);