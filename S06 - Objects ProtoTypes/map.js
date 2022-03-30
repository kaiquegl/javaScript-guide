const people = [
  {
    id: 3,
    name: "Kaique",
  },
  {
    id: 2,
    name: "Godoi",
  },
  {
    id: 1,
    name: "Lima",
  },
];

const newPeople = new Map();

for (const person of people) {
  const { id } = person;
  newPeople.set(id, { ...person });
}

// console.log(newPeople);

// for (const p of newPeople.values()) {
//   console.log(p);
// }

// for (const [i, { id, name }] of newPeople) {
//   console.log(i, id, name);
// }

newPeople.delete(2);
console.log(newPeople);
