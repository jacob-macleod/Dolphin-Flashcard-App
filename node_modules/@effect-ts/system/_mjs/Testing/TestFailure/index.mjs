// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as T from "../../Effect/index.mjs";
export const AssertionTypeId = /*#__PURE__*/Symbol();
export class Assertion {
  constructor(result) {
    this.result = result;
    this._typeId = AssertionTypeId;
  }

}
export const RuntimeTypeId = /*#__PURE__*/Symbol();
export class Runtime {
  constructor(cause) {
    this.cause = cause;
    this._typeId = RuntimeTypeId;
  }

}
T._E;
/**
 * Constructs an assertion failure with the specified result.
 */

export function assertion(result) {
  return new Assertion(result);
}
/**
 * Constructs a runtime failure that dies with the specified `Throwable`.
 */

export function die(e) {
  return halt(C.die(e));
}
/**
 * Constructs a runtime failure that fails with the specified error.
 */

export function fail(e) {
  return halt(C.fail(e));
}
/**
 * Constructs a runtime failure with the specified cause.
 */

export function halt(cause) {
  return new Runtime(cause);
}
//# sourceMappingURL=index.mjs.map