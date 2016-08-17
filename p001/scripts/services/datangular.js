'use strict';

/**
 * @ngdoc service
 * @name mudApp.Datangular
 * @description
 * # Datangular
 * Provider in the mudApp.
 */
angular.module('datangular', ['ngLodash'])
.provider('Datangular', ['lodash', function (_) {
	var d3 = window.d3;
	var __this = this;
  // Private variables
  var Configurer = {};
  Configurer.init = function(object, config) {
    object.configuration = config;

		/**
		* This is the BaseURL to be used with Restangular
		*/
		config.baseUrl = _.isUndefined(config.baseUrl) ? '' : config.baseUrl;
		object.setBaseUrl = function(newBaseUrl) {
			config.baseUrl = /\/$/.test(newBaseUrl) ?
			newBaseUrl.substring(0, newBaseUrl.length-1) : newBaseUrl;
			return this;
		};

		config.datafields = {};

		var Base = function() {};
		Base.prototype.dataset = {
			setRaw: function(raw) {
				config.datafields.rawdata = raw;
				return this;
			},
			setMeasures: function(raw) {
				config.datafields.measures = raw;
				return this;
			},
			setDimensions: function(raw) {
				config.datafields.dimensions = raw;
				return this;
			}
		};

		config.uCreateFactory = Base;
	};

	var globalConfiguration = {};

	Configurer.init(this, globalConfiguration);

  // Method for instantiating
  __this.$get = ['$http', '$q', function($http, $q) {

  	function createServiceForConfiguration(config) {
  		var service = {};

  		var theBase = new config.uCreateFactory();
  		console.log(theBase);
  		function fetchData(fileName) {
  			if (!fileName) {
  				return;
  			}
  			var deferred = $q.defer();
  			d3.csv(fileName, function(err, data) {
  				theBase.dataset.setRaw(data);
  				deferred.resolve(data);
  			});
  			return deferred.promise;
  		}

  		function getHeaders(arg) {
				var results = {measures : [], dimensions : []};
  			_.forEach(arg, function(v, k) {
					if(_.startsWith(k, 'm-')) {
						results.measures.push(k);
					} else {
						results.dimensions.push(k);
					}
  			});
  			theBase.dataset.setMeasures(results.measures);
  			theBase.dataset.setDimensions(results.dimensions);
  		}

  		function initialize(filePath) {
  			
  			if (!filePath) {
  				return;
  			}
  			var deferred = $q.defer();

	  			fetchData(filePath).then(function(d) {
	  				getHeaders(d[0]);
	  			});

  			return deferred.promise;
  		}

  		Configurer.init(service, config);

  		service.initialize = _.bind(initialize, service);

  		return service;
  	}

  	return createServiceForConfiguration(globalConfiguration);

  }];

}]);