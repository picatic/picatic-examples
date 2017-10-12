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

        selectEvent: function(e) {
          var pweSelector = function(id) {
            return document.getElementById(id);
          };

          var newEventId = e.event_id;
          var oldEventId = this.selectedEvent.event_id;

          // the selected event id must be added to the html element id attributes of picatic widget elements
          var iframe = pweSelector('picatic-widget-iframe-') || pweSelector('picatic-widget-iframe-' + oldEventId);
          var loadingDiv = pweSelector('picatic-loading-') || pweSelector('picatic-loading-' + oldEventId);
          var wrapper = pweSelector('picatic-widget-wrapper-') || pweSelector('picatic-widget-wrapper-' + oldEventId);

          iframe.id = 'picatic-widget-iframe-' + newEventId;
          iframe.removeAttribute('src');
          loadingDiv.id = 'picatic-loading-' + newEventId;
          wrapper.id = 'picatic-widget-wrapper-' + newEventId;

          // update the selected event properties
          this.selectedEvent.cover_image_uri = e.cover_image_uri;
          this.selectedEvent.description = e.description;
          this.selectedEvent.end = e.end;
          this.selectedEvent.event_id = e.event_id;
          this.selectedEvent.start = e.start;
          this.selectedEvent.summary = e.summary;
          this.selectedEvent.title = e.title;
          this.selectedEvent.venueLocality = e.venueLocality;
          this.selectedEvent.venueName = e.venueName;
          this.selectedEvent.venueStreet = e.venueStreet;
        },
        selectedEvent: {},
      };

      return self
    }
  ]);
