'use strict';

module.exports = function(ngModule) {
  ngModule.factory('ExamplesService', [ function() {
    var ExamplesService = {
      examples: [
        {
          name: 'create events',
          color: 'cerulean',
          description: 'Create new events quickly from your website or app.',
          demoLink: 'https://event-creator.picatic.io/',
          imgUrl: require('../img/create-events.png'),
          sourceLink: 'https://github.com/picatic/picatic-examples'
        },
        {
          name: 'checkout',
          color: 'dodger',
          description: 'Customize the registration and payment process with our checkout endpoints.',
          demoLink: 'https://checkout.picatic.io/',
          imgUrl: require('../img/checkout.png'),
          sourceLink: 'https://github.com/picatic/picatic-examples/tree/master/react-checkout'
        }
      ]
    };

    return ExamplesService;

  }])
}
