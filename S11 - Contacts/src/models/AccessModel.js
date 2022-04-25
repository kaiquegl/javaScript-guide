const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const AccessSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const AccessModel = mongoose.model("Access", AccessSchema);

class Access {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  valid() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail is not valid");
    }
    if (this.body.password.length < 3 || this.body.password.length >= 50) {
      this.errors.push("Invalid password size");
    }
  }

  async userExists() {
    const user = await AccessModel.findOne({ email: this.body.email });
    if (user) this.errors.push("User already registered!");
  }

  async register() {
    this.valid();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    try {
      this.user = await AccessModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Access;
