/*
  COSC 219 — Lab 9 · main.js
  The only file that touches the page.
*/

import { TRAIL_IDS } from "./api.js";
import { loadSome, uiState } from "./app.js";



/* Collect the four state panels by id. */
const panels = {
  loading: document.getElementById("state-loading"),
  error: document.getElementById("state-error"),
  empty: document.getElementById("state-empty"),
  loaded: document.getElementById("state-loaded")
};


/* show(state) — toggle d-none so exactly ONE panel is visible.

   Bootstrap's d-none is display:none, so this needs no CSS of your own:
     el.classList.toggle("d-none", name !== state);
*/

function show(state) {
  for (const [name, el] of Object.entries(panels)) {
    el.classList.toggle("d-none", name !== state);
  }
}
/* card(trail) — one column holding a .card.

   You may build the card's shell with a template string, because it
   contains no data. The trail's name and description go in AFTERWARDS
   with textContent. Lab 7's rule has not changed. */

function card(trail) {
  const col = document.createElement("div");
  col.className = "col";
  col.innerHTML = `
    <div class="card">
      <div class="card-body">
         <h2 class="card-title h5"></h2>
      </div>
    </div>
  `;
  col.querySelector(".card-title").textContent = trail;
  return col;
}


/* load() — the sequence:

     1. show the loading state
     2. await the data
     3. work out the state with uiState, fill the grid if it is "loaded"
     4. show that state
     5. if anything throws, put the message in the error panel and show it
*/


/* Wire the Load button, then call load() once so the page is not blank. */

async function load() {
  try {
    show("loading");
    const data = await loadSome(TRAIL_IDS);
    const state = uiState({ loading: false, error: null, items: data.loaded });
    if (state === "loaded") {
      const grid = panels.loaded;
      grid.innerHTML = "";
      for (const trail of data.loaded) {
        grid.appendChild(card(trail));
      }
    }
    show(state);
  } catch (err) {
    panels.error.querySelector(".alert").textContent = err.message;
    show("error");
  }
}

document.getElementById("loadButton").addEventListener("click", load);
load();
