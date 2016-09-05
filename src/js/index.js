/*
 * reveal-console.js
 * https://github.com/kaitoy/reveal-console.js
 * MIT licensed
 *
 * Copyright (C) 2016 Kaito Yamada
 */

const events = require('./events');

if (window.parent === window.self) {
  // Main window
  document.addEventListener('keydown', events.onKeyDownInMain);
  document.addEventListener('slidechanged', events.onSlidechanged);
  document.addEventListener('fragmentshown', events.onFragmentshown);
  document.addEventListener('fragmenthidden', events.onFragmenthidden);
  window.addEventListener('beforeunload', events.onBeforeunload);
} else {
  // Slide view and pre view in the console window
  document.addEventListener('ready', () => {
    window.parent.postMessage('sub-view-ready', '*');
  });
}
