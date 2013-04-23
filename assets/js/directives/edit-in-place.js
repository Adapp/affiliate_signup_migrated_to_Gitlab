(function(ng, undefined) {
  'use strict';

  ng.module('signup.directives').directive('editInPlace', ['customFormFields', function(formFields) {

    return {
      'restrict': 'E',
      'scope': {
        'value': '=',
        'class': '@'
      },
      'replace': true,
      'template': '<span class="edit-in-place"><span ng-click="edit()" ng-bind="value"></span><input name="{{name}}" ng-model="value"/></span> ',
      'link': function(scope, el, attributes) {
        // going through this so I can bind the blur event.
        var input = ng.element(el.children()[1]);

        scope.name = attributes.value.split('.')[1];

        // make sure the input gets styled correctly.
        input.addClass(attributes['class']);

        el.addClass('editMode');

        scope.edit = function() {
          el.addClass('active');
          input[0].focus();
        };

        input.bind('blur', function() {
          el.removeClass('active');
        });
      }
    };
  }]).directive('editInButton', function() {
       // Need this one so we can use the edit-in-place element within buttons.
      return {
        'restrict': 'A',
        'scope': false,
        'link': function(scope, el, attributes) {

          var root = ng.element(el.find('.edit-in-place')[0]);
          var input = ng.element(root.children()[1]);

          el.bind('click', function() {
            root.addClass('active');
            input[0].focus();
          });
        }
      };
    });;

})(angular);