#Lab 7
-The click listener is on `#trail-list` instead of on each button because `renderTrails` throws the buttons away and builds new ones every time the list changes, so a listener on a button would be lost after the first redraw, while the list stays on the page and catches every click as it bubbles up.

-If `loadTrails` didn't guard against corrupt data, `JSON.parse` would throw a `SyntaxError` as soon as `app.js` loaded, nothing after it would run, and the page would stay broken on every reload until someone deles key form localstorge.

-I used co pilot suggestions to help with some functions