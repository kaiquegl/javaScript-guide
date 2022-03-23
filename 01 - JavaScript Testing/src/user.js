class User {
  constructor({ name, id, profession, age }) {
    this.id = parseInt(id, 10);
    this.name = name;
    this.profession = profession;
    this.birthDay = new Date().getFullYear() - age;
  }
}

module.exports = User;
