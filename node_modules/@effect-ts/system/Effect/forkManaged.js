"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forkManaged = forkManaged;

var _fork = /*#__PURE__*/require("../Managed/fork.js");

var _toManaged = /*#__PURE__*/require("./toManaged.js");

/**
 * Forks the fiber in a `Managed`. Using the `Managed` value will
 * execute the effect in the fiber, while ensuring its interruption when
 * the effect supplied to `use` completes.
 */
function forkManaged(self, __trace) {
  return (0, _fork.fork)((0, _toManaged.toManaged)(self), __trace);
}
//# sourceMappingURL=forkManaged.js.map