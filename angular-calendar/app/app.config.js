'use strict';

var app = angular.module('angularCalendar');

app.
  constant('appSettings', {
    apiUrl: 'https://api.picatic.com',
    userId: 58212
  });

app.
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $routeProvider.
        when('/', {
          template: '<home-page></home-page>',
        }).
        otherwise('/');
    }
  ]);
