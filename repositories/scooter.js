const db = require("./../database");

const getBySerial = serial =>
  db.get(`SELECT * FROM scooter WHERE scooter_serial = ?`, [serial]);

const createBySerial = serial =>
  db.run(`INSERT INTO scooter (scooter_serial, status) VALUES (?, 'C')`, [
    serial
  ]);

const updateStatus = (serial, status) =>
  db.run(`UPDATE scooter SET status = ? WHERE scooter_serial = ?`, [
    status,
    serial
  ]);

module.exports = { getBySerial, createBySerial, updateStatus };
