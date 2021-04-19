const express = require("express");
const path = require("path");

const hostname = "192.168.1.77";
const port = 8082;

const app = express();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});
app.route("/*").get(function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
app.listen(port, hostname, () => {
  console.log("Listening at http://%s:%s/", hostname, port);
});