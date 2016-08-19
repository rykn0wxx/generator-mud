'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:GlobalctrlCtrl
 * @description
 * # GlobalctrlCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('GlobalctrlCtrl', ['$scope', function ($scope) {
	var me = this;

	me.login = false;
	$scope.login = false;

}]);
