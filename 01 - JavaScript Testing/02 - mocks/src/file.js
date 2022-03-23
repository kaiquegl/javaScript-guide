const { readFile } = require("fs/promises");

const User = require("./user");
const { error } = require("./constants");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    const users = File.parseCSVToJSON(content);
    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");

    const isHeaderValid = header.trim() === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        valid: false,
        error: error.FILE_FIELDS_ERROR_MESSAGE,
      };
    }

    const isContentLengthAccepted = fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        valid: false,
        error: error.FILE_LENGTH_ERROR_MESSAGE,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\n");
    // remove the first item and place it into variable
    const firstLine = lines.shift();

    const header = firstLine.replace("\r", " ").trim().split(",");

    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};

      for (const index in columns) {
        user[header[index]] = columns[index].replace("\r", " ").trim();
      }

      return new User(user);
    });

    return users;
  }
}

module.exports = File;
