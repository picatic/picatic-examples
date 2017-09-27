'use strict';

angular.
	module('ticketBox').
	component('ticketBox', {
		templateUrl: 'components/ticket-box/ticket-box.template.html',
		controller: ['Event',
			function TicketBoxController(Event) {
				this.selectedEvent = Event.selectedEvent;
			}]
	})
