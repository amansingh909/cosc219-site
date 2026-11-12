/*
  COSC 219 — Lab 7 · app.js
  The only file that touches the page. Open index.html with Live Server.
*/

// import from ./storage.js, ./render.js and ./trails.js
import { loadTrails, saveTrails, clearTrails } from "./storage.js";
import { renderTrails, summaryText } from "./render.js";
import { makeTrail, isValidTrail, addTrail, removeTrail, toggleTrail, findAction } from "./trails.js";

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const kmInput = document.querySelector("#km");
const error = document.querySelector("#error");
const summary = document.querySelector("#summary");
const list = document.querySelector("#trail-list");
const clearButton = document.querySelector("#clear");



/* Load the saved trails into a `let` — the array is replaced, not edited,
   every time something changes. */
let trails = loadTrails();


/* update() — redraw the list, rewrite the summary, and save.
   Call it whenever the data changes, and once at the very bottom of this
   file so the page is not blank on load. */

function update() {
   renderTrails(trails, document.querySelector("#trail-list"));
   document.querySelector("#summary").textContent = summaryText(trails);
   saveTrails(trails);
}


/* The add form.

   A submit reloads the page by default, throwing away everything in
   memory. Stop that first, then validate, then add.

   When the input is invalid: put a message in #error, focus the name
   field, and return without changing anything.
   When it is valid: clear #error, add the trail, reset the form. */

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!isValidTrail(nameInput.value, kmInput.value)) {
    error.textContent = "Give the trail a name and a distance above zero.";
    nameInput.focus();
    return;
  }
  error.textContent = "";
  trails = addTrail(trails, makeTrail(nameInput.value, kmInput.value));
  update();
  form.reset();
});

/* The list. */
list.addEventListener("click", event => {
  error.textContent = "";
  const hit = findAction(event.target);
  if (!hit) return;
  if (hit.action === "delete") trails = removeTrail(trails, hit.id);
  if (hit.action === "toggle") trails = toggleTrail(trails, hit.id);
  update();
});

/* The Clear all button: empty the array, clear storage, update. */
clearButton.addEventListener("click", () => {
  trails = [];
  clearTrails();
  update();
});

update();


/* The list.

   ONE listener on #trail-list — not one per button. The buttons are
   destroyed and rebuilt on every render, so a listener on a button would
   not survive the first redraw.

   Use findAction(event.target) to work out what was clicked.

   Clear #error here too — once the user clicks something in the list they
   have moved on from the form, and a stale validation message left on
   screen is just noise. */
   


/* The Clear all button: empty the array, clear storage, update. */

