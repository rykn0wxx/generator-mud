'use strict';

/**
 * @ngdoc function
 * @name mudApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mudApp
 */
angular.module('mudApp')
.controller('LoginCtrl', ['$scope', '$rootScope', '$timeout',  function ($scope, $rS, $t) {
	
	$scope.avatarz = [
		{name: 'demo1', image:'../images/avatars/1.jpg', ref:'#/main'},
		{name: 'demo2', image:'../images/avatars/2.jpg', ref:'#/main'},
		{name: 'demo3', image:'../images/avatars/3.jpg', ref:'#/main'},
		{name: 'demo4', image:'../images/avatars/4.jpg', ref:'#/main'}
	];
	
	$scope.reclass = function() {
		angular.element('body').attr('class', 'welcome-page');
	};
	
	$scope.loggedIn = function() {
		$t(function() {
			var glbl = $rS.$$ChildScope;
			angular.element('body').attr('class', 'a-theme');
			$scope.$apply(function() {
				$rS.$$childHead.glb.login = true;
				$rS.$$childHead.login = true;
			});	
		},1);
	};
	
	$scope.reclass();
}]);
