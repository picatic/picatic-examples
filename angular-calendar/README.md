# Event Calendar View

This project demonstrates a calendar view of events using the [Picatic API][picaticAPI] and [AngularJS][angularjs] v1.5

We used:

```
node v7.8.0
npm v5.4.2
```

You can check it out at https://calendar.picatic.io

## Getting Started

Clone this repository and install the dependencies using [npm][npm] and [bower][bower]:

```
npm install
bower install
```

### Run the Application

Start the development server with:

```
npm start:dev
```

Now browse to the app at [`localhost:8000`][local-app-url]

### Testing

Unit tests were built with [Jasmine][jasmine] and [Karma][karma]. Run them with:

```
npm test
```
This command will also watch the source and test files for changes, and re-run the test suite whenever
changes are made.

End-to-end tests were built with [Jasmine][jasmine] and [Protractor][protractor]. To run these tests, a
server must also be running:

```
npm start:dev

# in a seperate terminal window
npm run protractor
```

For more information about usage of the Picatic API, please see the [docs.][picaticAPIDocs]

[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[jasmine]: https://jasmine.github.io/
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/
[npm]: https://www.npmjs.org/
[picaticAPI]: http://developer.picatic.com/
[picaticAPIDocs]: http://developer.picatic.com/v2/api/
[protractor]: http://www.protractortest.org/
