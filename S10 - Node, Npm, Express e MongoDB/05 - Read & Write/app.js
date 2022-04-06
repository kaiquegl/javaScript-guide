const path = require("path");
const read = require("./modules/read");
// const write = require("./modules/write");

const fileDir = path.resolve(__dirname, "teste.json");

// const people = [{ name: "João" }, { name: "Maria" }, { name: "Eduardo" }];

// const peopleJson = JSON.stringify(people, "", 2);

// write(fileDir, peopleJson);

async function readFile(dir) {
  const fileData = await read(dir);
  dataRender(fileData);
}

function dataRender(data) {
  data = JSON.parse(data);
  data.forEach((item) => console.log(item));
}

readFile(fileDir);
