const { STATUS } = require("../commands/lookup");

const transitionRuleSet = [
  { from: STATUS.CREATED, to: STATUS.MAINTENANCE },
  { from: STATUS.MAINTENANCE, to: STATUS.DISTRIBUTING },
  { from: STATUS.DISTRIBUTING, to: STATUS.STREET },
  { from: STATUS.STREET, to: STATUS.DISTRIBUTING },
  { from: STATUS.STREET, to: STATUS.MAINTENANCE }
];

const canTransition = (from, to) =>
  transitionRuleSet.find(el => el.from === from && el.to === to);

module.exports = { canTransition, transitionRuleSet };