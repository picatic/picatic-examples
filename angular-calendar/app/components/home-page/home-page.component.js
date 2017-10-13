'use strict';

angular.module('homePage')
  .component('homePage', {
    templateUrl: 'components/home-page/home-page.template.html',
    controller: function() {
      this.selectedEvent = {};
    },
  });
