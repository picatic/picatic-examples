'use strict';

module.exports = function(ngModule) {
  ngModule.component('exampleContainer',  {
    template: require('./example-container.template.html'),
    controller: ['ExamplesService', function (ExamplesService) {
      this.examples = ExamplesService.examples
    }]
  })
}
