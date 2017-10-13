'use strict';

var Shuffle = window.Shuffle;
var element = document.querySelector('.shuffle-container');
var sizer = element.querySelector('.sizer-element');

document.addEventListener('DOMContentLoaded', function () {
  window.shuffleInstance = new Shuffle(document.getElementById('grid'), {
    itemSelector: '.grid__brick',
    sizer: sizer,
  });
});
