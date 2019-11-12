const { getBySerial, createBySerial } = require("../repositories/scooter");
const { insertDetail } = require("./../repositories/scooter-detail");
const { STATUS } = require('./lookup');
const ERROR = require("./../error-messages");

module.exports = serial =>
  getBySerial(serial)
    .then(row => {
      if (row) {
        throw ERROR.SERIAL_ALREADY_EXIST;
      }

      return createBySerial(serial);
    })
    .then(({ id }) => insertDetail(id, null, STATUS.CREATED))
    .then(() => getBySerial(serial))
    .then(({ scooter_serial, status }) => ({ scooter_serial, status }));
