'use strict';

describe('Event', function() {
	var $httpBackend;
	var appSettings;
	var apiUrl;
	var userId;
	var params = '';
	var eventData = {
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
	};

	// Add a custom equality tester before each test
	beforeEach(function() {
		jasmine.addCustomEqualityTester(angular.equals);
	});

	// Load the module that contains the `Phone` service before each test
	beforeEach(module('angularCalendar'));
	beforeEach(module('core.event'));

	// Instantiate the service and "train" `$httpBackend` before each test
	beforeEach(inject(function(_$httpBackend_, _Event_, _appSettings_) {
		appSettings = _appSettings_
		apiUrl = appSettings.apiUrl;
		userId = appSettings.userId;
		params += 'filter[user_id]=' + userId;
		params += '&filter[status]=active';
		params += '&page[limit]=30';
		params += '&page[offset]=0';
		params += '&sort=-start_date';

		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET(apiUrl + '/v2/event?' + params).respond(eventData);

		Event = _Event_;
	}));

	// Verify that there are no outstanding expectations or requests after each test
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should fetch the event data from ' + apiUrl + '/v2/event?' + params, function() {
		var events = Event.resource.query();
		$httpBackend.flush();
		expect(events).toEqual(eventData);
	});

});
