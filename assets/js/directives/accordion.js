(function(ng) {
  'use strict';
  var app = ng.module('signup.directives');

  app.controller('AccordionController', ['$scope', function ($scope) {

    var groups = $scope.groups = [];

    this.select = function (group) {
      ng.forEach(groups, function (group) {
        group.selected = false;
      });
      group.selected = true;
    };

    this.addGroup = function (group) {
      groups.push(group);
      if(group.selected) {
        this.select(group);
      }
    };

    this.removeGroup = function (group) {
      groups.splice(groups.indexOf(group), 1);
    };
  }]);

  app.directive('accordion', function () {
    return {
      restrict:'E',
      transclude:true,
      scope:{},
      controller:'AccordionController',
      template: '<div class="accordion" ng-transclude></div>'
    };
  });

  app.directive('accordionGroup', function () {
    return {
      require:'^accordion',
      restrict:'E',
      transclude:true,
      scope:{
        title:'=',
        selected: '@'
      },
      link:function (scope, element, attrs, accordionCtrl) {

        accordionCtrl.addGroup(scope);

        scope.select = function () {
          accordionCtrl.select(scope);
        };
        
        if(scope.selected) {
          scope.select();
        } 
        
        scope.$on('$destroy', function (event) {
          accordionCtrl.removeGroup(scope);
        });
      },
      template: '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" ng-click="select()">{{title}}</a></div><div class="accordion-body collapse" ng-class="{in : selected}"><div class="accordion-inner" ng-transclude></div></div></div>',
      replace:true
    };
  });
})(angular);
