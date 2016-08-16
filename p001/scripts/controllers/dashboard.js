'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('DashboardCtrl', ['$scope', 'lodash', 'DataFactory', function ($s, _, DataFactory) {
	var me = this;
	var d3 = window.d3;
	DataFactory.dataHeaders('markynotes/mainQuery.csv').then(function(data) {
		$s.dataHead = data;
		console.log(data);
	});
	
}]);