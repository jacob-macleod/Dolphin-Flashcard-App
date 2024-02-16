"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiberDump = void 0;

const FiberDump = (fiberId, fiberName, status) => ({
  _tag: "FiberDump",
  fiberId,
  fiberName,
  status
});

exports.FiberDump = FiberDump;
//# sourceMappingURL=dump.js.map