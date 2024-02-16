"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  tracingSymbol: true,
  traceCall: true,
  traceCallLast: true,
  accessCallTrace: true
};
exports.accessCallTrace = accessCallTrace;
exports.traceCall = traceCall;
exports.traceCallLast = traceCallLast;
exports.tracingSymbol = void 0;

var _index = /*#__PURE__*/require("./Global/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
// ets_tracing: off
const tracingSymbol = "$trace";
exports.tracingSymbol = tracingSymbol;
let currentTraceCall;

function traceCall(f, trace) {
  if (!(0, _index.isTracingEnabled)() || !trace) {
    return f;
  } // @ts-expect-error


  return (...args) => {
    currentTraceCall = trace;
    const res = f(...args);
    currentTraceCall = undefined;
    return res;
  };
}

function traceCallLast(f, __trace) {
  return (a, t) => t ? f(a, t) : f(a, __trace);
}

function accessCallTrace() {
  if (!(0, _index.isTracingEnabled)() || !currentTraceCall) {
    return undefined;
  }

  const callTrace = currentTraceCall;
  currentTraceCall = undefined;
  return callTrace;
}
//# sourceMappingURL=index.js.map