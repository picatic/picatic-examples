'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to home view when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('calendar', function() {

    beforeEach(function() {
      browser.get('/');
    });


    it('should render calendar when user navigates to /', function() {
      expect(element.all(by.css('.calendar-component'))).
        toBeDefined();
    });

    it('should render ticket-box when user navigates to /', function() {
      expect(element.all(by.css('.ticket-box'))).
        toBeDefined();
    });

  });

});
