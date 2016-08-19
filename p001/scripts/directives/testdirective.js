'use strict';
 
/**
 * @ngdoc directive
 * @name mudApp.directive:testDirective
 * @description
 * # testDirective
 */ 
angular.module('mudApp')
.directive('testDirective', [function () {
	return {
		template: '<div></div>',
		restrict: 'A', 
		link: function postLink(scope, elem) {
			var wind = angular.element(window).height();
			var mfoot = angular.element('.main-footer').height();
			console.log(wind, mfoot, scope, elem);
		}
	};
}])
.directive('baPanel', function baPanel(baPanel, baConfig) {
	return angular.extend({}, baPanel, {
		template: function(el, attrs) {
			var res = '<div  class="panel ' + (baConfig.theme.blur ? 'panel-blur' : '') + ' full-invisible ' + (attrs.baPanelClass || '');
			res += '" zoom-in ' + (baConfig.theme.blur ? 'ba-panel-blur' : '') + '>';
			res += baPanel.template(el, attrs);
			res += '</div>';
			return res;
		}
	});
})
.directive('baPanelBlur', function baPanelBlur(baPanelBlurHelper, $window, $rootScope) {
	var bodyBgSize;

	baPanelBlurHelper.bodyBgLoad().then(function() {
		bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
	});

	$window.addEventListener('resize', function() {
		bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
	});

	return {
		restrict: 'A',
		link: function($scope, elem) {
			if(!$rootScope.$isMobile) {
				baPanelBlurHelper.bodyBgLoad().then(function () {
					setTimeout(recalculatePanelStyle);
				});
				$window.addEventListener('resize', recalculatePanelStyle);

				$scope.$on('$destroy', function () {
					$window.removeEventListener('resize', recalculatePanelStyle);
				});
			}

			function recalculatePanelStyle() {
				if (!bodyBgSize) {
					return;
				}
				elem.css({
					backgroundSize: Math.round(bodyBgSize.width) + 'px ' + Math.round(bodyBgSize.height) + 'px',
					backgroundPosition: Math.floor(bodyBgSize.positionX) + 'px ' + Math.floor(bodyBgSize.positionY) + 'px'
				});
			}

		}
	};
})
.directive('baPanelSelf', function baPanelSelf(baPanel) {
	return angular.extend({}, baPanel, {
		link: function(scope, el, attrs) {
			el.addClass('panel panel-white');
			if (attrs.baPanelClass) {
				el.addClass(attrs.baPanelClass);
			}
		}
	});
})
.service('baPanelBlurHelper', function baPanelBlurHelper($q) {
	var res = $q.defer();
	var computedStyle = getComputedStyle(document.body, ':before');
	var image = new Image();
	image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
	image.onerror = function() {
		res.reject();
	};
	image.onload = function() {
		res.resolve();
	};

	this.bodyBgLoad = function() {
		return res.promise;
	};

	this.getBodyBgImageSizes = function() {
		var elemW = document.documentElement.clientWidth;
		var elemH = document.documentElement.clientHeight;
		if(elemW <= 640) return;
		var imgRatio = (image.height / image.width);       // original img ratio
		var containerRatio = (elemH / elemW);     // container ratio

		var finalHeight, finalWidth;
		if (containerRatio > imgRatio) {
			finalHeight = elemH;
			finalWidth = (elemH / imgRatio);
		} else {
			finalWidth = elemW;
			finalHeight = (elemW * imgRatio);
		}
		return { width: finalWidth, height: finalHeight, positionX: (elemW - finalWidth)/2, positionY: (elemH - finalHeight)/2};
	};
})
.service('baPanelBlurHelper', function baPanelBlurHelper($q) {
	var res = $q.defer();
	var computedStyle = getComputedStyle(document.body, ':before');
	var image = new Image();
	image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
	image.onerror = function() {
		res.reject();
	};
	image.onload = function() {
		res.resolve();
	};

	this.bodyBgLoad = function() {
		return res.promise;
	};

	this.getBodyBgImageSizes = function() {
		var elemW = document.documentElement.clientWidth;
		var elemH = document.documentElement.clientHeight;
		if(elemW <= 640) return;
		var imgRatio = (image.height / image.width);       // original img ratio
		var containerRatio = (elemH / elemW);     // container ratio

		var finalHeight, finalWidth;
		if (containerRatio > imgRatio) {
			finalHeight = elemH;
			finalWidth = (elemH / imgRatio);
		} else {
			finalWidth = elemW;
			finalHeight = (elemW * imgRatio);
		}
		return { width: finalWidth, height: finalHeight, positionX: (elemW - finalWidth)/2, positionY: (elemH - finalHeight)/2};
	};
});