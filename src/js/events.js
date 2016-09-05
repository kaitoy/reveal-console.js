/*
 * reveal-console.js
 * https://github.com/kaitoy/reveal-console.js
 * MIT licensed
 *
 * Copyright (C) 2016 Kaito Yamada
 */

const revealConsole = require('./revealConsole');

const onSlidechanged = () => {
  if (!revealConsole.isOpen) {
    return;
  }

  let newNotes = window.Reveal.getSlideNotes();
  if (!newNotes) {
    newNotes = '<div class="noNotes">No notes for this slide</div>';
  }
  revealConsole.notes.innerHTML = newNotes;
  revealConsole.notes.scrollTop = 0;

  const indices = window.Reveal.getIndices();
  let isLast = false;
  revealConsole.slideView.contentWindow.postMessage(
    JSON.stringify({ method: 'slide', args: [indices.h, indices.v] }), '*'
  );
  if (window.Reveal.availableFragments().next) {
    revealConsole.preView.contentWindow.postMessage(
      JSON.stringify({ method: 'slide', args: [indices.h, indices.v, 0] }), '*'
    );
  } else if (window.Reveal.isLastSlide()) {
    isLast = true;
  } else {
    revealConsole.preView.contentWindow.postMessage(
      JSON.stringify({ method: 'slide', args: [indices.h + 1, indices.v] }), '*'
    );
  }

  if (isLast) {
    revealConsole.hidePreView();
  } else {
    revealConsole.showPreView();
  }
};

module.exports = {
  onKeyDownInMain: (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey && e.shiftKey) {
      if (e.keyCode === 80) { // P
        revealConsole.open(onSlidechanged);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
    return true;
  },

  onSlidechanged,

  onFragmentshown: () => {
    if (!revealConsole.isOpen) {
      return;
    }

    revealConsole.slideView.contentWindow.postMessage(
      JSON.stringify({ method: 'next', args: [] }), '*'
    );
    revealConsole.preView.contentWindow.postMessage(
      JSON.stringify({ method: 'next', args: [] }), '*'
    );
    if (window.Reveal.isLastSlide() && !window.Reveal.availableFragments().next) {
      revealConsole.hidePreView();
    }
  },

  onFragmenthidden: () => {
    if (!revealConsole.isOpen) {
      return;
    }

    revealConsole.slideView.contentWindow.postMessage(
      JSON.stringify({ method: 'prev', args: [] }), '*'
    );
    revealConsole.preView.contentWindow.postMessage(
      JSON.stringify({ method: 'prev', args: [] }), '*'
    );
    revealConsole.showPreView();
  },

  onBeforeunload: () => {
    revealConsole.close();
  },
};
