'use strict';

angular.module('embedContainer')
  .component('embedContainer', {
    templateUrl: 'components/embed-container/embed-container.template.html',
    bindings: {
      selectedEvent: '<'
    },
  });
