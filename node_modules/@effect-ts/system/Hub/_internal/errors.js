"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidCapacityErrorSymbol = exports.InvalidCapacityError = void 0;
exports.ensureCapacity = ensureCapacity;
exports.isInvalidCapacityError = isInvalidCapacityError;

require("../../Operator/index.js");

var _a; // ets_tracing: off


const InvalidCapacityErrorSymbol = /*#__PURE__*/Symbol.for("@effect-ts/core/symbols/errors/InvalidCapacity");
exports.InvalidCapacityErrorSymbol = InvalidCapacityErrorSymbol;

class InvalidCapacityError extends Error {
  constructor(message) {
    super(message);
    this[_a] = "InvalidCapacityError";
    this.name = this[InvalidCapacityErrorSymbol];
  }

}

exports.InvalidCapacityError = InvalidCapacityError;
_a = InvalidCapacityErrorSymbol;

function ensureCapacity(capacity) {
  if (capacity <= 0) {
    throw new InvalidCapacityError(`A Hub cannot have a capacity of ${capacity}`);
  }
}

function isInvalidCapacityError(u) {
  return u instanceof Error && u[InvalidCapacityErrorSymbol] === "InvalidCapacityError";
}
//# sourceMappingURL=errors.js.map