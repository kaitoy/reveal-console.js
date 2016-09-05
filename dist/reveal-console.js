/*!
 * reveal-console.js 0.0.1
 * https://github.com/kaitoy/reveal-console.js
 * MIT licensed
 * 
 * Copyright (C) 2016 Kaito Yamada
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * reveal-console.js
	 * https://github.com/kaitoy/reveal-console.js
	 * MIT licensed
	 *
	 * Copyright (C) 2016 Kaito Yamada
	 */

	var events = __webpack_require__(1);

	if (window.parent === window.self) {
	  // Main window
	  document.addEventListener('keydown', events.onKeyDownInMain);
	  document.addEventListener('slidechanged', events.onSlidechanged);
	  document.addEventListener('fragmentshown', events.onFragmentshown);
	  document.addEventListener('fragmenthidden', events.onFragmenthidden);
	  window.addEventListener('beforeunload', events.onBeforeunload);
	} else {
	  // Slide view and pre view in the console window
	  document.addEventListener('ready', function () {
	    window.parent.postMessage('sub-view-ready', '*');
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * reveal-console.js
	 * https://github.com/kaitoy/reveal-console.js
	 * MIT licensed
	 *
	 * Copyright (C) 2016 Kaito Yamada
	 */

	var revealConsole = __webpack_require__(2);

	var onSlidechanged = function onSlidechanged() {
	  if (!revealConsole.isOpen) {
	    return;
	  }

	  var newNotes = window.Reveal.getSlideNotes();
	  if (!newNotes) {
	    newNotes = '<div class="noNotes">No notes for this slide</div>';
	  }
	  revealConsole.notes.innerHTML = newNotes;
	  revealConsole.notes.scrollTop = 0;

	  var indices = window.Reveal.getIndices();
	  var isLast = false;
	  revealConsole.slideView.contentWindow.postMessage(JSON.stringify({ method: 'slide', args: [indices.h, indices.v] }), '*');
	  if (window.Reveal.availableFragments().next) {
	    revealConsole.preView.contentWindow.postMessage(JSON.stringify({ method: 'slide', args: [indices.h, indices.v, 0] }), '*');
	  } else if (window.Reveal.isLastSlide()) {
	    isLast = true;
	  } else {
	    revealConsole.preView.contentWindow.postMessage(JSON.stringify({ method: 'slide', args: [indices.h + 1, indices.v] }), '*');
	  }

	  if (isLast) {
	    revealConsole.hidePreView();
	  } else {
	    revealConsole.showPreView();
	  }
	};

	module.exports = {
	  onKeyDownInMain: function onKeyDownInMain(e) {
	    if (!e.ctrlKey && !e.altKey && !e.metaKey && e.shiftKey) {
	      if (e.keyCode === 80) {
	        // P
	        revealConsole.open(onSlidechanged);
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	      }
	    }
	    return true;
	  },

	  onSlidechanged: onSlidechanged,

	  onFragmentshown: function onFragmentshown() {
	    if (!revealConsole.isOpen) {
	      return;
	    }

	    revealConsole.slideView.contentWindow.postMessage(JSON.stringify({ method: 'next', args: [] }), '*');
	    revealConsole.preView.contentWindow.postMessage(JSON.stringify({ method: 'next', args: [] }), '*');
	    if (window.Reveal.isLastSlide() && !window.Reveal.availableFragments().next) {
	      revealConsole.hidePreView();
	    }
	  },

	  onFragmenthidden: function onFragmenthidden() {
	    if (!revealConsole.isOpen) {
	      return;
	    }

	    revealConsole.slideView.contentWindow.postMessage(JSON.stringify({ method: 'prev', args: [] }), '*');
	    revealConsole.preView.contentWindow.postMessage(JSON.stringify({ method: 'prev', args: [] }), '*');
	    revealConsole.showPreView();
	  },

	  onBeforeunload: function onBeforeunload() {
	    revealConsole.close();
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * reveal-console.js
	 * https://github.com/kaitoy/reveal-console.js
	 * MIT licensed
	 *
	 * Copyright (C) 2016 Kaito Yamada
	 */

	var html = __webpack_require__(3);
	var css = __webpack_require__(4);

	var RevealConsole = function () {
	  function RevealConsole(consoleHtml) {
	    _classCallCheck(this, RevealConsole);

	    this.consoleHtml = consoleHtml;
	    this.consoleWindow = null;
	    this.slideView = null;
	    this.preView = null;
	    this.notes = null;
	    this.preViewOverlay = null;
	    this.isOpen = false;
	  }

	  _createClass(RevealConsole, [{
	    key: 'open',
	    value: function open(onReady) {
	      var _this = this;

	      if (window.parent !== window.self) {
	        // Slide view and pre view in the console window
	        return;
	      }

	      // Main window

	      if (this.isOpen) {
	        this.consoleWindow.focus();
	      } else {
	        (function () {
	          _this.consoleWindow = window.open();
	          _this.consoleWindow.document.open();
	          _this.consoleWindow.document.write(_this.consoleHtml);
	          _this.consoleWindow.document.title = 'Speaker Console (' + document.title + ')';
	          _this.consoleWindow.document.close();
	          _this.slideView = _this.consoleWindow.document.getElementById('slideView');
	          _this.preView = _this.consoleWindow.document.getElementById('preView');
	          _this.notes = _this.consoleWindow.document.getElementById('notes');
	          _this.preViewOverlay = _this.consoleWindow.document.getElementById('preView-overlay');

	          // When ready events are fired in both the slide view and the pre view,
	          // each of them sends a sub-view-ready message to the console window.
	          // The following code listens the messages.
	          var numReadySubViews = 0;
	          _this.consoleWindow.addEventListener('message', function (e) {
	            if (e.data !== 'sub-view-ready') {
	              return;
	            }

	            numReadySubViews++;
	            if (numReadySubViews === 2) {
	              onReady();
	            }
	          }, false);

	          // Just in case where sub-view-ready messages don't come somehow,
	          // listen to load events of the slide view and the pre view.
	          // This is actually needed for Firefox 49.
	          var numLoadedSubViews = 0;
	          _this.preView.contentWindow.addEventListener('load', function () {
	            numLoadedSubViews++;
	            if (numLoadedSubViews === 2) {
	              onReady();
	            }
	          });
	          _this.slideView.contentWindow.addEventListener('load', function () {
	            numLoadedSubViews++;
	            if (numLoadedSubViews === 2) {
	              onReady();
	            }
	          });

	          var prevButton = _this.consoleWindow.document.getElementById('prev');
	          prevButton.addEventListener('click', function (e) {
	            window.Reveal.prev();
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	          });
	          var nextButton = _this.consoleWindow.document.getElementById('next');
	          nextButton.addEventListener('click', function (e) {
	            window.Reveal.next();
	            e.preventDefault();
	            e.stopPropagation();
	            return false;
	          });

	          _this.consoleWindow.document.addEventListener('keydown', function (e) {
	            if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
	              switch (e.keyCode) {
	                case 37:
	                  // left arrow
	                  window.Reveal.prev();
	                  break;
	                case 39:
	                  // right arrow
	                  window.Reveal.next();
	                  break;
	                default:
	                // Just to make eslint happy.
	              }
	            }
	          });
	          _this.consoleWindow.addEventListener('beforeunload', function () {
	            _this.consoleWindow = null;
	            _this.isOpen = false;
	          });

	          _this.isOpen = true;
	        })();
	      }
	    }
	  }, {
	    key: 'showPreView',
	    value: function showPreView() {
	      this.preViewOverlay.classList.remove('pv-hidden');
	      this.preViewOverlay.classList.add('pv-shown');
	    }
	  }, {
	    key: 'hidePreView',
	    value: function hidePreView() {
	      this.preViewOverlay.classList.remove('pv-shown');
	      this.preViewOverlay.classList.add('pv-hidden');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      if (this.isOpen) {
	        this.consoleWindow.close();
	        this.consoleWindow = null;
	        this.isOpen = false;
	      }
	    }
	  }]);

	  return RevealConsole;
	}();

	module.exports = new RevealConsole(html.replace('</style>', css + '</style>'));

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<!doctype html>\n<html>\n  <head>\n    <style></style>\n  </head>\n  <body>\n    <div id=\"console\">\n      <div id=\"views\">\n        <iframe id=\"slideView\" scrolling=\"no\" src=\"" + document.URL + "\"></iframe>\n        <iframe id=\"preView\" scrolling=\"no\" src=\"" + document.URL + "\"></iframe>\n        <div id=\"slideView-overlay\"></div>\n        <div id=\"preView-overlay\" class=\"pv-shown\"></div>\n        <div id=\"blocker\"></div>\n      </div>\n      <div id=\"notes\"></div>\n    </div>\n    <div id=\"controls\">\n      <div id=\"prev\">Prev</div>\n      <div id=\"next\">Next</div>\n    </div>\n  </body>\n</html>\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: rgb(255, 255, 255);\n  padding: 0;\n  margin: 0;\n  font-family: Helvetica, Arial, Sans-Serif;\n  font-size: 2vw;\n}\n\n#console {\n  position: absolute;\n  top: 0.5vw;\n  left: 0.5vw;\n  right: 0.5vw;\n  bottom: 3vw;\n  margin: 0;\n}\n\n#views, #notes {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n}\n\n#views {\n  left: 0;\n  right: 50vw;\n  overflow: hidden;\n}\n\n#blocker {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n}\n\n#notes {\n  left: 50vw;\n  right: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 0.3ex;\n  background-color: rgb(255, 255, 255);\n  border: solid 1px rgb(120, 120, 120);\n}\n\n#notes .noNotes {\n  color: rgb(200, 200, 200);\n}\n\n#notes p {\n  margin-top: 0;\n}\n\niframe {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  border: solid 1px rgb(120, 120, 120);\n}\n\n#slideView {\n  top: 0;\n  width: 49vw;\n  height: 49vh;\n}\n\n#preView {\n  opacity: 0.7;\n  top: 50vh;\n  width: 30vw;\n  height: 30vh;\n}\n\n#controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  position: absolute;\n  bottom: 0.25vw;\n  left: 0.5vw;\n  right: 0.5vw;\n  height: 2.5vw;\n  background-color: rgb(255, 255, 255);\n  background-color: rgba(255, 255, 255, 0.6);\n}\n\n#prev, #next {\n  display: block;\n  border: solid 1px rgb(70, 70, 70);\n  border-radius: 0.5vw;\n  font-size: 1.5vw;\n  padding: 0.25vw;\n  text-decoration: none;\n  background-color: rgb(220, 220, 220);\n  color: rgb(0, 0, 0);\n}\n\n#prev:hover, #next:hover {\n  background-color: rgb(245, 245, 245);\n}\n\n#slideView-overlay {\n  z-index: 1;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 49vw;\n  height: 49vh;\n  background-color: rgba(0, 0, 0, 0);\n}\n\n#preView-overlay {\n  z-index: 1;\n  position: absolute;\n  top: 50vh;\n  left: 0;\n  width: 30vw;\n  height: 30vh;\n}\n\n.pv-shown {\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.pv-hidden {\n  background-color: rgb(0, 0, 0);\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ]);