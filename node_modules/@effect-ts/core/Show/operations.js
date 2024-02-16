"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = exports.number = exports.boolean = void 0;
exports.struct = struct;
exports.tuple = tuple;

function struct(shows) {
  return {
    show: s => `{ ${Object.keys(shows).map(k => `${k}: ${shows[k].show(s[k])}`).join(", ")} }`
  };
}

function tuple(...shows) {
  return {
    show: t => `[${t.map((a, i) => shows[i].show(a)).join(", ")}]`
  };
}

const boolean = {
  show: a => JSON.stringify(a)
};
exports.boolean = boolean;
const number = {
  show: a => JSON.stringify(a)
};
exports.number = number;
const string = {
  show: a => JSON.stringify(a)
};
exports.string = string;
//# sourceMappingURL=operations.js.map