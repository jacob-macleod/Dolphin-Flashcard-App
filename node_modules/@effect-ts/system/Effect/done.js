"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.done = done;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns an effect from a `Exit` value.
 */
function done(exit, __trace) {
  switch (exit._tag) {
    case "Success":
      {
        return (0, _core.succeed)(exit.value, __trace);
      }

    case "Failure":
      {
        return (0, _core.halt)(exit.cause, __trace);
      }
  }
}
//# sourceMappingURL=done.js.map