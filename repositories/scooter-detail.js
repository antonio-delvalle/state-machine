const db = require("../database");

const insertDetail = (id, from, to) =>
  db.run(
    `INSERT INTO scooter_detail (scooter_id, state_from, state_to) VALUES (?, ?, ?)`,
    [id, from, to]
  );

module.exports = { insertDetail };
