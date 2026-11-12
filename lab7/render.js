/*
  COSC 219 — Lab 7 · render.js
  Building DOM nodes. No storage and no event handling in this file.
*/


/* createTrailItem(trail) — one <li>, built and returned (not inserted).

   Structure, exactly:

     <li class="trail" data-id="x1">
       <span class="trail-name">Knox Mountain</span>
       <span class="trail-km">2.8 km</span>
       <button type="button" data-action="toggle">
         <span class="btn-label">Close</span>
       </button>
       <button type="button" data-action="delete"
               aria-label="Delete Knox Mountain">
         <span class="btn-label">Delete</span>
       </button>
     </li>

   Note the label sits in a <span> INSIDE each button. That is deliberate:
   it is what a real button looks like once it holds an icon, and it is
   why findAction has to use closest() rather than reading the target.

   When the trail is closed:
     · the <li> also gets the class "is-closed"
     · the toggle button says "Reopen" instead of "Close"

   Use document.createElement and textContent.
   NEVER innerHTML — the name came from a form or from storage, and
   innerHTML would parse it as markup. One of the tests feeds this
   function an <img onerror> and checks nothing was created.
   ---------------------------------------------------------------------- */

   function makeButton(action, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;
  const span = document.createElement("span");
  span.classList.add("btn-label");
  span.textContent = label;
  button.append(span);
  return button;
}

export function createTrailItem(trail) {
  const li = document.createElement("li");
  li.classList.add("trail");
  if (trail.closed) li.classList.add("is-closed");
  li.dataset.id = trail.id;

  const name = document.createElement("span");
  name.classList.add("trail-name");
  name.textContent = trail.name;

  const km = document.createElement("span");
  km.classList.add("trail-km");
  km.textContent = `${trail.km} km`;

  const toggle = makeButton("toggle", trail.closed ? "Reopen" : "Close");
  const del = makeButton("delete", "Delete");
  del.setAttribute("aria-label", `Delete ${trail.name}`);

  li.append(name, km, toggle, del);
  return li;

}


/* renderTrails(trails, container) — replace everything in the container
   with one item per trail.

   container.replaceChildren(...) empties and refills in one step.
   ---------------------------------------------------------------------- */

export function renderTrails(trails, container) {
  container.replaceChildren(...trails.map(createTrailItem));
}


/* summaryText(trails) — one line describing the list.

     []                                   →  "No trails yet. Add one above."
     [one open trail of 2.8 km]           →  "1 trail, 1 open, 2.8 km total."
     [2 trails, 1 open, 14.8 km]          →  "2 trails, 1 open, 14.8 km total."

   Note "1 trail" but "2 trails". Round the distance to one decimal place.
   ---------------------------------------------------------------------- */

export function summaryText(trails) {
  if (trails.length === 0) return "No trails yet. Add one above.";
  const openCount = trails.filter(trail => !trail.closed).length;
  const totalKm = trails.reduce((sum, trail) => sum + trail.km, 0);
  const trailWord = trails.length === 1 ? "trail" : "trails";
  return `${trails.length} ${trailWord}, ${openCount} open, ${totalKm.toFixed(1)} km total.`;
}
