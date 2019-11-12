const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/scooters");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.use(function(req, res){
  res.status(404);
});

const server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
