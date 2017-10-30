'use strict';

var angular = require('angular');
var ngModule = angular.module('app', []);

require('./components')(ngModule);
require('./services')(ngModule);
require('./styles/normalize.css');
require('./styles/_less/bootstrap.less');
require('./styles/_less/marketing.less');
require('./styles/app.css');
