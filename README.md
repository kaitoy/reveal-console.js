reveal-console.js
=================

reveal-console.js provides a speaker console for slides made by [reveal.js](https://github.com/hakimel/reveal.js).
It shows a small view of the current slide, a preview of the next slide (or fragment), and speaker notes.

Unlike the [speaker notes plugin](https://github.com/hakimel/reveal.js#speaker-notes) bundled in reveal.js, reveal-console.js can work without a web server or Node.js.

This library was inspired by [impress-console](https://github.com/regebro/impress-console).

Contents
--------

* [Install](#install)
* [How to Use](#how-to-use)
* [Browser Support](#browser-support)
* [Build](#build)
* [License](#license)
* [Contact](#contact)

Install
-------
1. Download the latest version of reveal-console.js from https://github.com/kaitoy/reveal-console.js/releases
2. Unzip it and copy `dist/reveal-console.min.js` to your reveal.js presentation project.
3. Add `<script src="path/to/reveal-console.min.js"></script>` to the index.html.

How to Use
----------
`Shift + P` to open the console window.

[sample](https://kaitoy.github.io/reveal-console.js)

Browser Support
---------------
I confirmed reveal-console.js works well on Firefox 49 and Chrome 52.

Build
-----
1. Install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/).
2. Download reveal-console.js by `https://github.com/kaitoy/reveal-console.js.git`.
3. In the project root directory, run `npm install`.
4. Run `npm run build` or `npm run minify`.

License
-------

reveal-console.js is distributed under the MIT license.

    Copyright (c) 2016 Kaito Yamada

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
    NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Contact
-------

Kaito Yamada (kaitoy@pcap4j.org)
