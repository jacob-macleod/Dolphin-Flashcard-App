"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiberStateExecuting = exports.FiberStateDone = void 0;
exports.initial = initial;
exports.interrupting = interrupting;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/index.js"));

var _status = /*#__PURE__*/require("./status.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class FiberStateExecuting {
  constructor(status, observers, interrupted) {
    this.status = status;
    this.observers = observers;
    this.interrupted = interrupted;
    this._tag = "Executing";
  }

}

exports.FiberStateExecuting = FiberStateExecuting;

class FiberStateDone {
  constructor(value) {
    this.value = value;
    this._tag = "Done";
    this.interrupted = C.empty;
    this.status = new _status.Done();
  }

}

exports.FiberStateDone = FiberStateDone;

function initial() {
  return new FiberStateExecuting(new _status.Running(false), [], C.empty);
}

function interrupting(state) {
  let current = state.status;

  while (current) {
    switch (current._tag) {
      case "Running":
        {
          return current.interrupting;
        }

      case "Finishing":
        {
          return current.interrupting;
        }

      case "Done":
        {
          return false;
        }

      case "Suspended":
        {
          current = current.previous;
        }
    }
  }

  throw new Error("BUG: should never end up here");
}
//# sourceMappingURL=state.js.map