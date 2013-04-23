(function(ng, undefined) {
  'use strict';

  ng.module('signup.directives').directive('signupForm', ['customFormFields', function(formFields) {

    return {
      'restrict': 'A',
      'scope': false,
      'link': function(scope, el, attrs) {

        el.bind('submit', function(e) {
          if(!formFields.networkId || !formFields.networkToken) {
            e.preventDefault();
            alert('You must enter the Network ID and the Network/Api Token to proceed.');
          }
        });
      }
    };
  }]);

})(angular);