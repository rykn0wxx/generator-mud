'use strict';
if (typeof window.jQuery === undefined) {
  throw new Error('Requires jQuery');
} else {
	window.$.mud = {};
}

var Highcharts = window.Highcharts;

window.$.mud.options = {
	animationSpeed: 500,
	bsTooltipSelector: '[data-toggle="tooltip"]',
	enableBoxWidget: true,
	boxWidgetOptions: {
    boxWidgetIcons: {
      collapse: 'fa-minus',
      open: 'fa-plus'
    },
    boxWidgetSelectors: {
      collapse: '[data-widget="collapse"]'
    }
  },
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

function _init(m, $) {
	m.layout = {
		activate: function() {
			var _this = this;
			_this.fix();
			$(window, '.wrapper').resize(function () {
				setTimeout(function() {
					_this.fix();
				}, 300);
			});
		},
		fix: function () {
			if ($('.reveal').length === 0) {
				var windowHeight = $(window).height();
				$('.content').css('min-height', windowHeight - $('.main-footer').outerHeight());
			}
			//$('.reveal').css('height',windowHeight);
		}
	};

	m.demo = {
		slidecharts: function () {
			$('#hc-box').highcharts({

					chart: {
							type: 'bubble',
							plotBorderWidth: 1,
							zoomType: 'xy'
					},

					title: {
							text: 'Highcharts bubbles with radial gradient fill'
					},

					xAxis: {
							gridLineWidth: 1
					},

					yAxis: {
							startOnTick: false,
							endOnTick: false
					},

					series: [{
							data: [
									[9, 81, 63],
									[98, 5, 89],
									[51, 50, 73],
									[41, 22, 14],
									[58, 24, 20],
									[78, 37, 34],
									[55, 56, 53],
									[18, 45, 70],
									[42, 44, 28],
									[3, 52, 59],
									[31, 18, 97],
									[79, 91, 63],
									[93, 23, 23],
									[44, 83, 22]
							],
							marker: {
									fillColor: {
											radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
											stops: [
													[0, 'rgba(255,255,255,0.5)'],
													[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
											]
									}
							}
					}, {
							data: [
									[42, 38, 20],
									[6, 18, 1],
									[1, 93, 55],
									[57, 2, 90],
									[80, 76, 22],
									[11, 74, 96],
									[88, 56, 10],
									[30, 47, 49],
									[57, 62, 98],
									[4, 16, 16],
									[46, 10, 11],
									[22, 87, 89],
									[57, 91, 82],
									[45, 15, 98]
							],
							marker: {
									fillColor: {
											radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
											stops: [
													[0, 'rgba(255,255,255,0.5)'],
													[1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
											]
									}
							}
					}]

			});
		}
	};

}
(function($) {

	var m = $.mud;
	_init(m, $);
	m.layout.activate();
}(window.jQuery));