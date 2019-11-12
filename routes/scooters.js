const actions = require("./../factories");

const appRouter = app => {
  app.post("/scooters", function(req, res) {
    if (!req.body.serial || !req.body.action) {
      return res.status(400).send({ error: "Invalid Request" });
    }

    return actions(req.body.action, req.body.serial)
      .then(result => res.send({ data: result }))
      .catch(error => res.status(400).send({ error: error }));
  });
};

module.exports = appRouter;
