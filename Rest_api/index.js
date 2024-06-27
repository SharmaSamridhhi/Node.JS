const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { error, log } = require("console");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("hello from middleware 1");
//   req.myUserName = "piyushgarg.dev";
//   next();
// });
// app.use((req, res, next) => {
//   console.log(`hello ${req.myUserName} from middleware 2`);
//   res.end("response ended!!!!");
// });

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
      .join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //delete user with id
    return res.json({ status: "pending" });
  });
app.post("/api/users", (req, res) => {
  //create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required!!" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});
app.listen(PORT, () => console.log(`Server started at PORT xyz:${PORT}`));
