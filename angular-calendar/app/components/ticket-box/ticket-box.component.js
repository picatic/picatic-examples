'use strict';

angular.
  module('ticketBox').
  component('ticketBox', {
    templateUrl: 'components/ticket-box/ticket-box.template.html',
    bindings: {
      selectedEvent: '<'
    },
  })
