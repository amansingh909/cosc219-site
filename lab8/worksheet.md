# Lab 8 — Debugging worksheet

Fill one block in for each fault you find. **The reasoning is what is marked**,
not the fix — a one-line correction with no explanation earns very little.

Copy the block as many times as you need.

---

## Fault 1

**Symptom** — what did you see, or what did the checker say?
The checker said "heading levels are not skipped" was broken. The page itself looked fine; the "Filter and sort" heading just looked a bit small.

**How I found it** — which tool, and what did it tell you?
(Console message? Elements panel? Reading the CSS? Tabbing through the page?)
Elements panel. I expanded `<main>` and read the headings in order: an `<h1>` followed straight by an `<h3>`, with no `<h2>` in between.

**Cause** — why did that happen? Name the concept, not just the line.
Headings are the outline of the page, not a way to choose font size. Screen reader users jump from heading to heading to understand the structure, so going from h1 to h3 tells them a level is missing. The heading level should match the structure, and the size should come from CSS.



**Fix** — what you changed.
Changed `<h3>Filter and sort</h3>` to `<h2>Filter and sort</h2>`.

**Lecture** — which one covers this.
Lecture 2


---

## Fault 2

**Symptom**
The checker said "every form control has a label" was broken. On the page, the search box's hint text disappears as soon as you type, and then nothing says what the box is for.


**How I found it**
Elements panel. I compared the two controls: the rating `<select>` has a `<label for="rating">`, but the search `<input>` only has a `placeholder`.


**Cause**
A placeholder is a hint, not a label. It vanishes when you start typing, and screen readers are not guaranteed to announce it as the field's name. A `<label for="...">` gives the input a real accessible name, and clicking the label also focuses the input.


**Fix**
Added `<label for="search">Search by name</label>` before the search input.


**Lecture**
Lecture 3


---

## Fault 3

**Symptom**
With the window about 400px wide, the search box hung off the right edge of the form.


**How I found it**
Device toolbar at 400px, then I selected `#search` in Elements and looked at the box model in the Computed tab. The padding and border sat outside the width, so the whole box was wider than the form.


**Cause**
The default `box-sizing` is `content-box`, where `width` only measures the content area and padding and border are added on top. `#search` had `width: 100%` plus 0.5rem padding on each side and a 1px border, so its total width was 100% plus about 18px. With `border-box`, `width` includes the padding and border, so 100% really means 100%.


**Fix**
Added `html { box-sizing: border-box; }` and `*, *::before, *::after { box-sizing: inherit; }` at the top of styles.css, so every element uses border-box, not just the search box. I did not add a wrapper, because that would hide the symptom instead of fixing the cause.


**Lecture**
Lecture 4


---

## Fault 4

**Symptom**
Tabbing through the form showed no highlight on anything, so I couldn't tell which control I was on.


**How I found it**
The Tab key first. Then in the Styles pane I clicked `:hov`, ticked `:focus` on the search box, and saw the rule `input:focus, select:focus, button:focus { outline: none; }` applying.


**Cause**
Browsers draw a focus outline around whatever has keyboard focus. `outline: none` removed it and nothing replaced it, so keyboard users had no way to see where they were. A `:hover` style would not help, because keyboard users never hover.


**Fix**
Replaced `outline: none` with `outline: 2px solid var(--brand);` and `outline-offset: 2px;`. The offset leaves a gap so the ring still shows around the green Apply button.


**Lecture**
Lecture 4


---

## Fault 5

**Symptom**
Nothing visible. Filtering by rating looked like it worked. The checker said "filtering compares without converting types" was broken.


**How I found it**
Console. `"1" == 1` gave `true` and `"1" === 1` gave `false`, which showed that `==` changes types before comparing.


**Cause**
`==` does type coercion: it converts both values to the same type before comparing, so values of different types can count as equal (`"1" == 1`, `0 == ""`). Here both sides happened to be strings, so it worked by luck, but it would give wrong matches as soon as a value arrived as a different type. `===` compares value and type with no conversion.


**Fix**
Changed both `==` in the `byRating` line of `matches()` to `===`.


**Lecture**
Lecture 7


---

## Fault 6

**Symptom**
The results were not in distance order. After I fixed that, the checker's "sorting does not reorder the array it was given" check, which had been passing, switched to broken.


**How I found it**
Console. `String({ km: 5 })` gives `"[object Object]"`, which showed what `sort()` was really comparing. The second problem showed up when the checker flipped after my first fix.


**Cause**
Two problems in one function. First, `sort()` with no comparator converts each item to a string and compares them alphabetically. Every trail object becomes `"[object Object]"`, so they all looked equal and nothing moved. Second, `sort()` sorts in place: it rearranges the array it is called on. Once the sort actually worked, `sortByDistance` was changing the caller's array, which is a side effect. That second problem was hidden until the first was fixed, because before then nothing moved.


**Fix**
`return [...trails].sort((a, b) => a.km - b.km);` The spread makes a copy so the original array is untouched, and the comparator returns a negative number when `a` is shorter, so trails go shortest to longest.


**Lecture**
Lecture 9


---

## Fault 7

**Symptom**
Nothing visible, because none of the real trail names contain HTML. The checker said "a trail name is put on the page as text" was broken.


**How I found it**
Elements panel on check.html. The checker renders a trail named `<img src=x onerror="alert(1)">`, and inside the hidden `#results` list there was a real `<img>` element instead of text.


**Cause**
`innerHTML` parses its string as HTML, so any tags inside a trail name become real elements. A name like `<img src=x onerror="...">` would run JavaScript as soon as the image failed to load. That is cross-site scripting (XSS). `textContent` puts the string on the page as plain text, so tags are shown, not run.


**Fix**
In `render()`, replaced the `li.innerHTML = ...` assignment with two spans made with `document.createElement("span")`, filled with `textContent`, and added with `li.append(nameSpan, kmSpan)`. Same class names, so the page looks the same.


**Lecture**
Lecture 13


---

## Fault 8

**Symptom**
Pressing Apply made the page flash and reset, so the search box and rating went back to their defaults.


**How I found it**
Network panel with "Preserve log" ticked. Pressing Apply showed index.html and its files being requested again, so the whole page was reloading.


**Cause**
A form's default action on submit is to send the form and load a new page, which reloads this one. The submit listener did run `apply()`, but the reload wiped the result out straight after. `event.preventDefault()` cancels that default action so the page stays put.


**Fix**
Gave the listener an `event` parameter and called `event.preventDefault()` before `apply()`.


**Lecture**
Lecture 14


---

## One more thing

**Which fault took you longest, and why?**
The sort (Fault 6). After I added the comparator, a check that had been passing started failing. It took a while to see it was a second problem hidden behind the first: `sort()` changes the array it is called on.


**Which one would you never have found without the checker?**
Fault 7, the innerHTML one. None of the real trail names contain HTML, so the page looked and worked fine. The hole only shows up when a name contains tags, and the checker is what fed it one.

