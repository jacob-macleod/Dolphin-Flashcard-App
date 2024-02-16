"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectMaybeAsyncInterrupt = effectMaybeAsyncInterrupt;
exports.effectMaybeAsyncInterruptBlockingOn = effectMaybeAsyncInterruptBlockingOn;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index2 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

var _index3 = /*#__PURE__*/require("../Support/OneShot/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _flatten = /*#__PURE__*/require("./flatten.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */
function effectMaybeAsyncInterrupt(register, __trace) {
  return effectMaybeAsyncInterruptBlockingOn(register, [], __trace);
}
/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */


function effectMaybeAsyncInterruptBlockingOn(register, blockingOn, __trace) {
  return core.chain_(core.succeedWith(() => [new _index2.AtomicReference(false), new _index3.OneShot()]), ([started, cancel]) => (0, _interruption.onInterrupt_)((0, _flatten.flatten)(core.effectAsyncOptionBlockingOn(k => {
    started.set(true);
    const ret = new _index2.AtomicReference(O.none);

    try {
      const res = register(io => k(core.succeed(io)));

      switch (res._tag) {
        case "Right":
          {
            ret.set(O.some(core.succeed(res.right)));
            break;
          }

        case "Left":
          {
            cancel.set(res.left);
            break;
          }
      }
    } finally {
      if (!cancel.isSet()) {
        cancel.set(core.unit);
      }
    }

    return ret.get;
  }, blockingOn, __trace)), () => core.suspend(() => started.get ? cancel.get() : core.unit)));
}
//# sourceMappingURL=effectMaybeAsyncInterrupt.js.map