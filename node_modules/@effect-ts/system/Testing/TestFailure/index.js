"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeTypeId = exports.Runtime = exports.AssertionTypeId = exports.Assertion = void 0;
exports.assertion = assertion;
exports.die = die;
exports.fail = fail;
exports.halt = halt;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const AssertionTypeId = /*#__PURE__*/Symbol();
exports.AssertionTypeId = AssertionTypeId;

class Assertion {
  constructor(result) {
    this.result = result;
    this._typeId = AssertionTypeId;
  }

}

exports.Assertion = Assertion;
const RuntimeTypeId = /*#__PURE__*/Symbol();
exports.RuntimeTypeId = RuntimeTypeId;

class Runtime {
  constructor(cause) {
    this.cause = cause;
    this._typeId = RuntimeTypeId;
  }

}

exports.Runtime = Runtime;
T._E;
/**
 * Constructs an assertion failure with the specified result.
 */

function assertion(result) {
  return new Assertion(result);
}
/**
 * Constructs a runtime failure that dies with the specified `Throwable`.
 */


function die(e) {
  return halt(C.die(e));
}
/**
 * Constructs a runtime failure that fails with the specified error.
 */


function fail(e) {
  return halt(C.fail(e));
}
/**
 * Constructs a runtime failure with the specified cause.
 */


function halt(cause) {
  return new Runtime(cause);
}
//# sourceMappingURL=index.js.map