'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('DashboardCtrl', ['$scope', 'lodash', 'DataFactory', '$rootScope', 'Datangular', 
	function ($s, _, DataFactory, $rS, Datangular) {
	var me = this;
	var d3 = window.d3;
	$rS.activenav = 'dashboard';
	DataFactory.dataHeaders('markynotes/mainQuery.csv').then(function(data) {
		$s.dataHead = data;
	});
	Datangular.initialize('markynotes/mainQuery.csv');
	$s.abc = Datangular.configuration.datafields;
}]);