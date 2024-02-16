"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = exports.number = exports.date = exports.boolean = void 0;

var _operations = /*#__PURE__*/require("./operations.js");

const compare = (x, y) => {
  return x < y ? -1 : x > y ? 1 : 0;
};

const boolean = /*#__PURE__*/(0, _operations.makeOrd)(compare);
exports.boolean = boolean;
const number = /*#__PURE__*/(0, _operations.makeOrd)(compare);
exports.number = number;
const date = /*#__PURE__*/(0, _operations.contramap_)(number, date => date.valueOf());
exports.date = date;
const string = /*#__PURE__*/(0, _operations.makeOrd)(compare);
exports.string = string;
//# sourceMappingURL=common.js.map