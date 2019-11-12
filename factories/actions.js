const Promise = require("bluebird");
const { create, maintain, distribute, street } = require("./../commands");
const ERROR = require("./../error-messages");
const { STATUS } = require("./../commands/lookup");

const actions = (action, serial) => {
  switch (action) {
    case STATUS.CREATED:
      return create(serial);
    case STATUS.MAINTENANCE:
      return maintain(serial);
    case STATUS.DISTRIBUTING:
      return distribute(serial);
    case STATUS.STREET:
      return street(serial);
    default:
      return new Promise((resolve, reject) => {
        reject(ERROR.ACTION_NOT_EXIST);
      });
  }
};

module.exports = actions;
