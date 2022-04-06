const fs = require("fs").promises;

module.exports = (dir, data) => {
  fs.writeFile(dir, data, { flag: "w" }); // flag: "a", to append
};
