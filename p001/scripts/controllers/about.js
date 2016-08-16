'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('AboutCtrl', ['$rootScope', function ($rS) {
	var me = this;
	me.marky = 'markynotes/sample.md';
	$rS.activenav = 'about';
}]);