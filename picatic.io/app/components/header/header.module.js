'use strict';

module.exports = function(ngModule) {
  ngModule.component('header',  {
    template: require('./header.template.html'),
    controller: function () {
      this.mainMenu = {
        visible: false
      }
    }
  })
}
