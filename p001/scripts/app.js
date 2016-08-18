'use strict';

/**
 * @ngdoc overview
 * @name mudApp
 * @description
 * # mudApp
 *
 * Main module of the application.
 */
angular
.module('mudApp', [
	'ngAnimate',
	'ngAria',
	'ngResource',
	'ngRoute',
	'ngLodash',
	'restangular',
	'datangular'
]) 
.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('/markynotes/');
  $routeProvider
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/testpage', {
      templateUrl: 'views/testpage.html',
      controller: 'TestpageCtrl',
      controllerAs: 'testpage'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
			resolve: {
				store: function(Datangular) {
					return Datangular.initialize('markynotes/mainQuery.csv').then(function(d){
						return d;
					});
				}
			}
    })
    .when('/dashboard/dash2', {
      templateUrl: 'views/dash2.html',
      controller: 'Dash2Ctrl',
      controllerAs: 'dash2'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .otherwise({
      redirectTo: '/login'
    });
}])
.directive('a', [function() {
	return ({
		restrict: 'E',
		link: function postLink(scope, elem, attrs) {
			if (attrs.href === '' || attrs.href === '#') {
				elem.on('click', function(ev) {
					ev.preventDefault();
				});
			}
		}
	});
}])
.directive('uiToolTip', [function () {
  return {
    restrict: 'A',
    compile: function (tElem) {
      tElem.tooltip();
    }
  };
}]);