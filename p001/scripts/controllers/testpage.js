'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:TestpageCtrl
 * @description
 * # TestpageCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('TestpageCtrl', ['$rootScope', function ($rS) {
	$rS.activenav = 'testpage';
}]);