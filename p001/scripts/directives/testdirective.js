'use strict';
 
/**
 * @ngdoc directive
 * @name mudApp.directive:testDirective
 * @description
 * # testDirective
 */ 
angular.module('mudApp')
.directive('testDirective', [function () {
  return {
    template: '<div></div>',
    restrict: 'A', 
    link: function postLink(scope, elem) {
			var wind = angular.element(window).height();
			var mfoot = angular.element('.main-footer').height();
      console.log(wind, mfoot, scope, elem);
    }
  };
}]);