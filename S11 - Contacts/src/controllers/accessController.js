const Access = require("../models/AccessModel");

exports.index = (req, res) => {
  res.render("access");
  return;
};

exports.register = async (req, res) => {
  try {
    const access = new Access(req.body);
    await access.register();

    console.log(access.errors);

    if (access.errors.length > 0) {
      req.flash("errors", access.errors);
      req.session.save(() => {
        return res.redirect("/access/index");
      });
      return;
    }

    req.flash("success", "User was created successfully!");
    req.session.save(() => {
      return res.redirect("/access/index");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
