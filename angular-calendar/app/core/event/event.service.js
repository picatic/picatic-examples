'use strict';

angular.
  module('core.event').
  factory('Event', ['$resource', 'appSettings',
    function($resource, appSettings) {
      var apiUrl = appSettings.apiUrl;
      var userId = appSettings.userId;
      var params = '';
      params += 'filter[user_id]=' + userId;
      params += '&filter[status]=active';
      params += '&page[limit]=30';
      params += '&page[offset]=0';
      params += '&sort=-start_date';

      var self = {
        resource: $resource(apiUrl + '/v2/event?' + params, {}, {
          query: {
            method: 'GET'
          },
        }),
      };

      return self
    }
  ]);
