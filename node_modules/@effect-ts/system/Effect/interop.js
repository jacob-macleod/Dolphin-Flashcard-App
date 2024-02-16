"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromAsync = fromAsync;
exports.fromIO = fromIO;

var Async = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Async/index.js"));

var IO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../IO/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _effectAsyncInterrupt = /*#__PURE__*/require("./effectAsyncInterrupt.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lift Async into Effect
 */
function fromAsync(async, __trace) {
  return (0, _core.accessM)(r => (0, _effectAsyncInterrupt.effectAsyncInterrupt)(cb => {
    const cancel = Async.runAsyncEnv(async, r, exit => {
      switch (exit._tag) {
        case "Success":
          {
            cb((0, _core.succeed)(exit.a));
            break;
          }

        case "Interrupt":
          {
            cb(_interruption.interrupt);
            break;
          }

        case "Failure":
          {
            cb((0, _fail.fail)(exit.e));
            break;
          }
      }
    });
    return (0, _core.succeedWith)(() => {
      cancel();
    });
  }, __trace));
}
/**
 * Lift IO into Effect
 */


function fromIO(io, __trace) {
  return (0, _core.succeedWith)(() => IO.run(io), __trace);
}
//# sourceMappingURL=interop.js.map