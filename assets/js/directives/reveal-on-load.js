(function(ng, $,  undefined) {
  'use strict';

  ng.module('signup.directives').directive('revealOnLoad', function() {

    return {
      'restrict': 'A',
      'scope': false,
      'link': function(scope, el, attrs) {
          var jqel = $('#welcomeModal');

          jqel.reveal();

          jqel.find('#closeModal').bind('click', function(e) {
            e.preventDefault();
            jqel.trigger('reveal:close');
          });

      }
    };
  });

})(angular, jQuery);