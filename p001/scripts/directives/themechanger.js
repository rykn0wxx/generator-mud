'use strict';

/**
 * @ngdoc directive
 * @name mudApp.directive:themeChanger
 * @description
 * # themeChanger
 */
angular.module('mudApp')
.controller('ThemeChangerCtrl', ['$scope', '$element', function($s, $e){
	var me = this;
	
	$s.isActive = false;

}])
.directive('themeChanger', [function () {
	function postLink(s, e, a) {
		e.bind('click', function(ev) {
			return s.$apply(function() {
				if (ev.target.classList.contains('theme-changer-icon')) {
					s.isActive = !s.isActive;
				}
				if (ev.target.classList.contains('styleswitch') || ev.target.parentElement.classList.contains('styleswitch')) {
					var tempEL = (angular.element(ev.toElement).attr('rel')) ? angular.element(ev.toElement).attr('rel') : angular.element(ev.toElement).attr('alt');
					angular.element('body').attr('class', tempEL + '-theme');
				}
			});
		});
	}
	return ({
		scope: {},
		templateUrl: 'views/tmpl-themechanger.html',
		replace: true,
		restrict: 'A',
		controller: 'ThemeChangerCtrl',
		controllerAs: 'themectrl',
		link: postLink
	});
}]);
