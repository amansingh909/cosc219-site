// "7" + 3              : 73
// "7" - 3              : 4
// 7 + 3 + "1"          : "101"
// "7" * "2"            : 14
// 10 / 3               : 3
// typeof null          : idk
// typeof NaN           : idk
// Boolean("false")     : true
// Boolean("0")         : true
// 0 || "fallback"      : "fallback"
// 0 ?? "fallback"      : 0
// "" || "empty"        : "empty"
// "10" == 10           : true
// "10" === 10          : false
// Number("12abc")      : idk
// parseInt("12abc")    : 12
// " hi ".trim()        : "hi"
// "cat".includes("a")  : true

console.log('"7" + 3 =', "7" + 3);
console.log('"7" - 3 =', "7" - 3);
console.log('7 + 3 + "1" =', 7 + 3 + "1");
console.log('"7" * "2" =', "7" * "2");
console.log('10 / 3 =', 10 / 3); //didnt know it would give a decimal instead of integer division
console.log('typeof null =', typeof null);
console.log('typeof NaN =', typeof NaN);
console.log('Boolean("false") =', Boolean("false"));
console.log('Boolean("0") =', Boolean("0"));
console.log('0 || "fallback" =', 0 || "fallback");
console.log('0 ?? "fallback" =', 0 ?? "fallback");
console.log('"" || "empty" =', "" || "empty");
console.log('"10" == 10 =', "10" == 10);
console.log('"10" === 10 =', "10" === 10);
console.log('Number("12abc") =', Number("12abc"));
console.log('parseInt("12abc") =', parseInt("12abc"));
console.log('" hi ".trim() =', " hi ".trim());
console.log('"cat".includes("a") =', "cat".includes("a"));