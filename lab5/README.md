# Lab 5: Arrays, loops and iterators

## What the report shows
Only 2 of 10 trails are closed, but together they take 16.7 of the 71.3 km off the map, which leaves 54.6 km open, and Mission Creek (16 km) is still the longest trail you can hike.

## The trap that caught me
My first `report` filtered out the closed trails itself instead of calling `openTrails()`, and because my local variable was also named `openTrails`, it hid the function, so I had to rename it before I could call it.

## AI use
Wrote most functions and had help from copilot suggestions