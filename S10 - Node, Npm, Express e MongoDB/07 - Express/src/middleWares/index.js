exports.middlewareGlobal = (res, req, next) => {
  // res.locals.someVarLocal = "This is a local var";
  console.log("middleware");
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.send("Bad CSRF");
  }
};

exports.sendCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
