// const HomeModel = require("../models/Home");

// HomeModel.create({
//   title: "A test title",
//   description: "A random description.",
// })
//   .then((data) => console.log(data))
//   .catch((e) => console.log("error", e));

exports.homePage = (req, res) => {
  // req.session.user = { name: "Kaique", logged: true };
  // req.flash("info", "Hello World!");
  // console.log(req.flash("info"));

  res.render("index", {
    title: "This is a fake Title",
    number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
};

exports.formHandler = (req, res) => {
  res.send("Post router");
};
