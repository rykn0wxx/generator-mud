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
    'restangular'
  ]) 
.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('/markynotes/');
  $routeProvider
    .when('/', {
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
      controllerAs: 'dashboard'
    })
    .otherwise({
      redirectTo: '/'
    });

  RestangularProvider.setResponseInterceptor(function(data, operation, what) {
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
    if (operation === 'get') {
      return csvToJson(data, ',', true);
    }
    return data;
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