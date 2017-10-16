'use strict';

angular.
  module('calendar').
  component('calendar', {
    templateUrl: 'components/calendar/calendar.template.html',
    controller: ['Event',
      function CalendarController(Event) {
        var self = this;

        var formatEvents = function(response) {
          if (!response.data) {
            return [];
          };
          return response.data.reduce(function(formattedEvents, currentEvent) {
            var attributes = currentEvent.attributes;
            var event = {
              cover_image_uri: attributes.cover_image_uri,
              description: attributes.description,
              event_id: currentEvent.id,
              title: attributes.title,
              start: moment(attributes.start_date + 'T' + attributes.start_time),
              summary: attributes.summary,
              end: moment(attributes.end_date + 'T' + attributes.end_time),
              venueLocality: attributes.venue_locality,
              venueName: attributes.venue_name,
              venueStreet: attributes.venue_street
            }
            formattedEvents.push(event);
            return formattedEvents;
          }, [])
        };

        // config object for angular-ui calendar
        this.uiConfig = {
          calendar: {
            editable: false,
            navLinks: true,
            header: {
              left: 'month agendaWeek agendaDay',
              center: 'title',
              right: 'today prev,next'
            },
            eventDrop: this.alertOnDrop,
            eventResize: this.alertOnResize,
            eventClick: self.onEventSelection({$event: {selectedEvent: event}});
          }
        };
        this.eventSources = [];

        var events = Event.resource.query({}, function(response) {
          var formatted = formatEvents(response);
          self.eventSources.push(formatted);
        });
      }
    ],
    bindings: {
      onEventSelection: '&'
    }
  });
