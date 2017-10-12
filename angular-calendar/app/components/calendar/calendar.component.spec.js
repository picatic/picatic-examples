'use strict';

describe('calendar', function() {

  // Load the module that contains the `calendar` component before each test
  beforeEach(module('angularCalendar'));
  beforeEach(module('calendar'));

  // Test the controller
  describe('CalendarController', function() {
    var $httpBackend, appSettings, ctrl, apiUrl, userId;
    var params = '';

    beforeEach(inject(function($componentController, _$httpBackend_, _appSettings_) {
      appSettings = _appSettings_;
      apiUrl = appSettings.apiUrl;
      userId = appSettings.userId;
      params += 'filter[user_id]=' + userId;
      params += '&filter[status]=active';
      params += '&page[limit]=30';
      params += '&page[offset]=0';
      params += '&sort=-start_date';

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(apiUrl + '/v2/event?' + params)
        .respond({
        data: [
          {
            attributes: {
              browse_ur: null,
              comments_enable: true,
              cover_image_uri: "http://s3.amazonaws.com/files.picatic.com/events/95338/383ed001-dbe0-4503-e4e3-1693f9d633b6",
              currency_id: 1,
              custom_css: null,
              custom_js: null,
              description: "\u003cp\u003eJoin\nus\u003c/p\u003e",
              disclaimer: null,
              donation_title: null,
              donations_enabled: false,
              end_date: "2017-10-05",
              end_time: "1:3:00",
              extended_checkout_info: false,
              external_url: "http://external_url.ca/",
              facebook_enabled: true,
              googleplus_enabled: true,
              has_promo_code: false,
              intro_box_colour: "black",
              intro_box_opacity: 0.42,
              linkedin_enabled: true,
              logo_uri: "",
              payment_option_id: 5,
              poster_type: "none",
              poster_uri: "http://s3.amazonaws.com/files.picatic.com/events/66201/LLSnhZvlRRuLMChuBegk_Calgary%20Info%20Session%20Photo.jpg",
              promoter_avatar_uri: "http://s3.amazonaws.com/files.picatic.com/events/71484/e0e0a317-22cd-4816-8924-84a1bbed62d3",
              promoter_name: "The promoter name",
              public: true,
              slug: "TOOct2017IS",
              start_date: "2017-10-05",
              start_time: "1:0:00",
              status: "active",
              summary: "Come to our great event",
              taxes_enabled: false,
              theme: null,
              time_zone: "America/Toronto",
              title: "Cool new event",
              twitter_enabled: true,
              twitter_hashtag: "",
              type: "regular",
              user_id: 58212,
              venue_capacity: 0,
              venue_country_id: 38,
              venue_locality: "Toronto",
              venue_name: "Our Place",
              venue_region_id: 9,
              venue_street: "100 Spadina Avenue",
              video: null,
              white_label: false
            },
            id: 124289,
            relationships: {},
            type: "event"
          }
        ],
        links: {
          last: "last link",
          next: "next link"
        },
        meta: {
          "license-url": "the license-url",
          version: "0.0.0"
        }
      });

      ctrl = $componentController('calendar');
    }));

    it('should create a `eventSources` property with 1 event fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.eventSources).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.eventSources).toEqual([
        [
          {
            cover_image_uri: "http://s3.amazonaws.com/files.picatic.com/events/95338/383ed001-dbe0-4503-e4e3-1693f9d633b6",
            description: "\u003cp\u003eJoin\nus\u003c/p\u003e",
            event_id: 124289,
            title: "Cool new event",
            start: moment('2017-10-05T1:0:00'),
            summary: "Come to our great event",
            end: moment('2017-10-05T1:3:00'),
            venueLocality: "Toronto",
            venueName: "Our Place",
            venueStreet: "100 Spadina Avenue"
          }
        ]
      ]);
    });
  });
});
