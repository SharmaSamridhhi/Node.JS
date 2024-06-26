const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome back!!");
});
app.get("/about", (req, res) => {
  return res.send("Welcome to about page!!");
});
app.get("/contact", (req, res) => {
  return res.send(`Welcome ${req.query.name}! your number is +91-111 111 1111`);
});

app.listen(8000, () => console.log("Server Started!!!!"));
