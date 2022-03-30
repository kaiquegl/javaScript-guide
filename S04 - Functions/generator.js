function* generator() {
  yield "Value1";
  yield "Value2";
  yield "Value3";
}

const g1 = generator();
// for (const value of g1) {
//   console.log(value);
// }

function* infinityGenerator() {
  let i = 0;

  while (true) {
    yield i;
    i++;
  }
}

const g2 = infinityGenerator();

// console.log(g2.next());

function* generator2() {
  yield 0;
  yield 1;
  yield 2;
}

function* generator3() {
  yield* generator2();
  yield 3;
  yield 4;
  yield 5;
}

const g3 = generator3();
// for (const value of g3) {
//   console.log(value);
// }

function* funcGenerator() {
  yield function () {
    console.log("yield1");
  };

  // return function () {
  //   console.log("return");
  // };

  yield function () {
    console.log("yield2");
  };
}

const g4 = funcGenerator();
const f1 = g4.next().value;
const f2 = g4.next().value;
// f1();
// f2();
