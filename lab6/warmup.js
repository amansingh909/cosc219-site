const original = { name: 'Knox', km: 2.8 };
const alias = original;
const copy = { ...original };
alias.km = 99; // what is original.km now?
copy.km = 1; // and now?
const outer = { name: 'X', meta: { tags: ['steep'] } };
const shallow = { ...outer };
shallow.meta.tags.push('rocky'); // what is outer.meta.tags?
({ x: 1 } === { x: 1 })


console.log(alias.km); //99
console.log(copy.km); //1
console.log(original === alias); //true
console.log(original === copy); //false
console.log(shallow.name = 'changed'); //changed
console.log(shallow.meta.tags.push()); //4
console.log(outer.meta == shallow.meta); //false
console.log({ x: 1 } === { x: 1 }); //false
