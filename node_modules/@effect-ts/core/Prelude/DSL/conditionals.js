"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conditionalF = conditionalF;
exports.conditionalF_ = conditionalF_;

function conditionalF(_) {
  return (onTrue, onFalse) => b => b ? onTrue() : onFalse();
}

function conditionalF_(_) {
  return (predicate, onTrue, onFalse) => predicate ? onTrue() : onFalse();
}
//# sourceMappingURL=conditionals.js.map