'use strict';

/**
 * @ngdoc service
 * @name mudApp.rawCsv
 * @description
 * # rawCsv
 * Provider in the mudApp.
 */
angular.module('mudApp')
.provider('RawCsv', ['lodash', function(_) {
	var d3 = window.d3;

	var Configs = {};

	Configs.init = function(object, config) {
		object.configuration = config;
		config.baseUrl = _.isUndefined(config.baseUrl) ? '' : config.baseUrl;
		object.setBaseUrl = function(newBaseUrl) {
			config.baseUrl = /\/$/.test(newBaseUrl) ?
			newBaseUrl.substring(0, newBaseUrl.length-1) :
			newBaseUrl;
			return this;
		};
	};

	var globalConfiguration = {};

	Configs.init(this, globalConfiguration);

	// Method for instantiating
  this.$get = ['$http', '$q', function ($h, $q) {

    function createServiceForConfigs(config) {
    	var service = {};

	  	function csvToJson(csv, separator, header) {
				if (!csv) {
					return;
				}

				separator = separator || ',';
				header = header || true;

				var result = [];
				var headers = [];
				var start = 0;

				var lines = csv.split('\n');
				var columnCount = lines[0].split(separator).length;
				if (header) {
					headers = lines[0].split(separator);
					start = 1;
				}

				for (var i = start; i < lines.length; i++) {
					var obj = {};
					var currentline = lines[i].split(new RegExp(separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
					if (currentline.length === columnCount) {
						if (header)  {
							for (var j = 0; j < headers.length; j++) {
								obj[headers[j]] = currentline[j];
							}
							obj.id = i;
						} else {
							for (var k = 0; k < currentline.length; k++) {
								obj[k] = currentline[k];
							}
						}
						result.push(obj);
					}
				}

				return JSON.stringify(result);
			}

			function getHeaders(csv) {
				var results = {};
				if (!csv) {
					return; 
				}
				var defer = $q.defer();
				d3.csv('markynotes/mainQuery.csv', function(err, data) {
					results.measure = [];
					results.dimension = [];
					var temp = data[0];
					_.forEach(temp, function(v, k) {
						if(_.startsWith(k, 'm-')) {
							results.measures.push(k);
						} else {
							results.dimensions.push(k);
						}
					});
					defer.resolve(results);
				});
				return defer.promise;
			}

    	Configs.init(service, config);
    	service.csvToJson = _.bind(csvToJson, service);
    	service.getHeaders = _.bind(getHeaders, service);
    }
    return createServiceForConfigs(globalConfiguration);
  }];

}])
.factory('DataFactory', function(lodash, $q) {
	var d3 = window.d3;
	var _ = lodash;
	function nestingFunc(propName) {
		return function(d) {
			return d[propName];
		};
	}
	
	var getHeaders = function(csvFile) {
		if (!csvFile) {
			return;
		}
		var deferred = $q.defer();
		var results = {};
		d3.csv(csvFile, function(err, data) {
			results.measures = [];
			results.dimensions = [];
			var temp = data[0];
			_.forEach(temp, function(v, k) {
				if(_.startsWith(k, 'm-')) {
					results.measures.push(k);
				} else {
					results.dimensions.push(k);
				}
			});
			deferred.resolve(results);
		});
		return deferred.promise;
	};
	return {
		dataHeaders: getHeaders
	};
});