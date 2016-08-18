'use strict';

/**
 * @ngdoc directive
 * @name mudApp.directive:reveal
 * @description
 * # reveal
 */
angular.module('mudApp')
.controller('RevealController', ['$templateCache', '$scope', function($templateCache, $scope){
	var $ = window.$;
	var me = this;
	$scope.slideHash = '';
	$scope.origElem = false;
	me.reCheck = function() {
		if ($templateCache.get('deck')) {
			var temp = $templateCache.get('deck');
			angular.element('.content').css('min-height',0);
			angular.element('body').addClass('with-reveal');
			angular.element('.wrapper').before(temp);
			$scope.origElem = true;
		}
	};
	me.exitSlide = function() {
		var temp = angular.element('#temp');
		$templateCache.put('deck', temp);
		temp.remove();
		$('ul.nav li a').off('click');
		angular.element('body').removeClass('with-reveal');
	};
	me.reCheck();
}])
.directive('reveal', ['$timeout', function($t) {
	var r = window.Reveal;
	var $ = window.$;
	function revealCompileFunction(tElement) {
		return {
			pre: function preLink(scope, iElement) {
				if (scope.origElem === false) {
					var temp = angular.element(iElement[0].outerHTML);
					var mdSource = scope.about.marky;
					var mdTarget = temp.find('#secmd');
					mdTarget.attr('data-markdown', mdSource);
					temp.attr('id', 'temp');
					angular.element('.content').css('min-height',0);
					angular.element('body').addClass('with-reveal');
					angular.element('.wrapper').before(temp);
				} 
			}, 
			post: function postLink(scope, iElement, iAttrs, controller) {
				scope.slideHash = window.location.hash;
				$t(function() {  
						r.initialize({  
							width: 1280,
							height: 720,	
							center: true,
							controls: true,
							minScale: 0.35,
							parallaxBackgroundImage: 'images/p-bg-1.jpg',
							dependencies: [
								{ src: 'bower_components/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
								{ src: 'bower_components/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
								{ src: 'bower_components/reveal.js/plugin/zoom-js/zoom.js', async: true } 
							]
						});
						$.mud.demo.slidecharts();
				}, 300);
				$('ul.nav li a').on('click', function(event) {
					controller.exitSlide();
					$t(function(){
						$.mud.layout.fix();
					},100);
				});
				
			}
		};
	}
	return ({
		restrict: 'C',
		replace: false,
		controller: 'RevealController',
		compile: revealCompileFunction
	});
}]);