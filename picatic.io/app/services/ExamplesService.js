'use strict';

module.exports = function(ngModule) {
  ngModule.factory('ExamplesService', [ function() {
    var ExamplesService = {
      examples: [
        // {
        //   name: 'events calendar',
        //   color: 'heart',
        //   description: 'It\'s easy to customize each step in the event registration process and maintain your brand guidelines with our Ticketing API.',
        //   demoLink: 'https://calendar.picatic.io/',
        //   imgUrl: require('../img/calendar.png'),
        //   sourceLink: 'https://github.com/picatic/picatic-examples'
        // },
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
