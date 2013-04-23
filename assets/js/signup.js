(function( win ) {
  'use strict';

  angular.module('signup.services', []);
  angular.module('signup.directives', ['signup.services']);
  win.App = angular.module('signup', ['signup.services', 'signup.directives']);
})( window );

