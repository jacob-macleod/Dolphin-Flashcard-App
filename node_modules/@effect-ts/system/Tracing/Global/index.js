"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableTracing = disableTracing;
exports.enableTracing = enableTracing;
exports.isTracingEnabled = isTracingEnabled;
// ets_tracing: off
let _tracing = false;

function enableTracing() {
  _tracing = true;
}

function disableTracing() {
  _tracing = false;
}

function isTracingEnabled() {
  return _tracing;
}
//# sourceMappingURL=index.js.map