const { STATUS } = require("./lookup");
const { getBySerial, updateStatus } = require("../repositories/scooter");
const { insertDetail } = require("../repositories/scooter-detail");
const { canTransition } = require("./../stateMachine");
const ERROR = require("./../error-messages");

module.exports = serial =>
  getBySerial(serial)
    .then(row => {
      if (!row) {
        throw ERROR.SERIAL_NOT_EXIST;
      }

      if (!canTransition(row.status, STATUS.DISTRIBUTING)) {
        throw ERROR.TRANSITION_NOT_ALLOWED;
      }

      return insertDetail(row.id, row.status, STATUS.DISTRIBUTING).then(() =>
        updateStatus(serial, STATUS.DISTRIBUTING)
      );
    })
    .then(() => getBySerial(serial))
    .then(({ scooter_serial, status }) => ({ scooter_serial, status }));
