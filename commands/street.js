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

      if (!canTransition(row.status, STATUS.STREET)) {
        throw ERROR.TRANSITION_NOT_ALLOWED;
      }

      return insertDetail(row.id, row.status, STATUS.STREET).then(() =>
        updateStatus(serial, STATUS.STREET)
      );
    })
    .then(() => getBySerial(serial))
    .then(({ scooter_serial, status }) => ({ scooter_serial, status }));
