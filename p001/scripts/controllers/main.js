'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('MainCtrl', ['$rootScope', function ($rS) {

	$rS.activenav = 'main';

}]);