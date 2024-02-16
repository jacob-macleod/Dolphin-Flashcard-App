var _a; // ets_tracing: off


import "../../Operator/index.mjs";
export const InvalidCapacityErrorSymbol = /*#__PURE__*/Symbol.for("@effect-ts/core/symbols/errors/InvalidCapacity");
export class InvalidCapacityError extends Error {
  constructor(message) {
    super(message);
    this[_a] = "InvalidCapacityError";
    this.name = this[InvalidCapacityErrorSymbol];
  }

}
_a = InvalidCapacityErrorSymbol;
export function ensureCapacity(capacity) {
  if (capacity <= 0) {
    throw new InvalidCapacityError(`A Hub cannot have a capacity of ${capacity}`);
  }
}
export function isInvalidCapacityError(u) {
  return u instanceof Error && u[InvalidCapacityErrorSymbol] === "InvalidCapacityError";
}
//# sourceMappingURL=errors.mjs.map