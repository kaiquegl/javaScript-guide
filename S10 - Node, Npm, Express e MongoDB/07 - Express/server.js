require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const middleWares = require("./src/middleWares");

const routes = require("./routes");
const helmet = require("helmet");
const csrf = require("csurf");

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.emit("ready");
  })
  .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "secretMsg123",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(middleWares.middlewareGlobal);
app.use(middleWares.checkCsrfError);
app.use(middleWares.sendCsrfToken);

app.use(routes);

// app.get("/testes/:userId?", (req, res) => {
//   console.log(req.params, req.query);
//   res.send(req.params);
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("Received the form data!");
// });

// app.get("/contact", (req, res) => {
//   res.send("Thank you for contact us!");
// });

app.on("ready", () => {
  app.listen(8000, () => console.log(`Server running at: http://localhost:8000`));
});
