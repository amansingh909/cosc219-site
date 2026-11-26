# Lab 9: Bootstrap and async JavaScript

## Promise.all vs allSettled
I'd use Promise.all when the page needs every result to be useful, like getTrailNames, and allSettled when partial results are still worth showing, like loadSome, where one bad id shouldn't throw away the trails that did load.

## Most useful Bootstrap component
The grid, because row-cols-1 row-cols-md-2 row-cols-lg-3 gave me 3 cards per row without a single media query.

## AI use
I used co-pilot for suggestions for some parts of the lab.