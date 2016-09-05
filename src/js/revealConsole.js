/*
 * reveal-console.js
 * https://github.com/kaitoy/reveal-console.js
 * MIT licensed
 *
 * Copyright (C) 2016 Kaito Yamada
 */

const html = require('../revealConsole');
const css = require('../css/revealConsole');

class RevealConsole {
  constructor(consoleHtml) {
    this.consoleHtml = consoleHtml;
    this.consoleWindow = null;
    this.slideView = null;
    this.preView = null;
    this.notes = null;
    this.preViewOverlay = null;
    this.isOpen = false;
  }

  open(onReady) {
    if (window.parent !== window.self) {
      // Slide view and pre view in the console window
      return;
    }

    // Main window

    if (this.isOpen) {
      this.consoleWindow.focus();
    } else {
      this.consoleWindow = window.open();
      this.consoleWindow.document.open();
      this.consoleWindow.document.write(this.consoleHtml);
      this.consoleWindow.document.title = `Speaker Console (${document.title})`;
      this.consoleWindow.document.close();
      this.slideView = this.consoleWindow.document.getElementById('slideView');
      this.preView = this.consoleWindow.document.getElementById('preView');
      this.notes = this.consoleWindow.document.getElementById('notes');
      this.preViewOverlay = this.consoleWindow.document.getElementById('preView-overlay');

      // When ready events are fired in both the slide view and the pre view,
      // each of them sends a sub-view-ready message to the console window.
      // The following code listens the messages.
      let numReadySubViews = 0;
      this.consoleWindow.addEventListener('message', (e) => {
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
      let numLoadedSubViews = 0;
      this.preView.contentWindow.addEventListener('load', () => {
        numLoadedSubViews++;
        if (numLoadedSubViews === 2) {
          onReady();
        }
      });
      this.slideView.contentWindow.addEventListener('load', () => {
        numLoadedSubViews++;
        if (numLoadedSubViews === 2) {
          onReady();
        }
      });

      const prevButton = this.consoleWindow.document.getElementById('prev');
      prevButton.addEventListener('click', (e) => {
        window.Reveal.prev();
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      const nextButton = this.consoleWindow.document.getElementById('next');
      nextButton.addEventListener('click', (e) => {
        window.Reveal.next();
        e.preventDefault();
        e.stopPropagation();
        return false;
      });

      this.consoleWindow.document.addEventListener('keydown', (e) => {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
          switch (e.keyCode) {
            case 37: // left arrow
              window.Reveal.prev();
              break;
            case 39: // right arrow
              window.Reveal.next();
              break;
            default:
              // Just to make eslint happy.
          }
        }
      });
      this.consoleWindow.addEventListener('beforeunload', () => {
        this.consoleWindow = null;
        this.isOpen = false;
      });

      this.isOpen = true;
    }
  }

  showPreView() {
    this.preViewOverlay.classList.remove('pv-hidden');
    this.preViewOverlay.classList.add('pv-shown');
  }

  hidePreView() {
    this.preViewOverlay.classList.remove('pv-shown');
    this.preViewOverlay.classList.add('pv-hidden');
  }

  close() {
    if (this.isOpen) {
      this.consoleWindow.close();
      this.consoleWindow = null;
      this.isOpen = false;
    }
  }
}

module.exports = new RevealConsole(html.replace('</style>', `${css}</style>`));
