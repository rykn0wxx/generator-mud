'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('DashboardCtrl', ['$scope', 'lodash', '$rootScope', 'store', 
	function ($s, _, $rS, store) {
	var me = this;
	var d3 = window.d3;
	$rS.activenav = 'dashboard';
	
	$s.operations = [
		{id:'sum', title: 'Sum'},
		{id:'count', title: 'Count'}
	];
	
	$s.measures = store.measures;
	
}]);