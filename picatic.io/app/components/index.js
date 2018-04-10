'use strict';

module.exports = function(ngModule) {
  require('./header/header.module')(ngModule);
  require('./example-container/example-container.module')(ngModule);
  require('./mobile-menu/mobile-menu.module')(ngModule);
}
