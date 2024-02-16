"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncEffect = asyncEffect;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var _index4 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Take/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _Emit = /*#__PURE__*/require("./_internal/Emit.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */
function asyncEffect(register, outputBuffer = 16) {
  return new C.Stream(CH.unwrapManaged(M.map_(M.tap_(M.bind_(M.bind_(M.do, "output", () => T.toManagedRelease_(Q.makeBounded(outputBuffer), Q.shutdown)), "runtime", () => M.runtime()), ({
    output,
    runtime
  }) => T.toManaged(register((0, _Emit.toEmit)(k => {
    try {
      runtime.run(T.chain_(TK.fromPull(k), _ => Q.offer_(output, _)));
    } catch (e) {
      if (CS.isFiberFailure(e)) {
        if (!CS.interrupted(e.cause)) {
          throw e;
        }
      }
    }
  })))), ({
    output
  }) => {
    const loop = CH.unwrap(T.foldCauseM_(T.chain_(Q.take(output), _ => TK.done(_)), maybeError => {
      return T.as_(Q.shutdown(output), E.fold_(CS.failureOrCause(maybeError), l => O.fold_(l, () => CH.end(undefined), failure => CH.fail(failure)), cause => CH.failCause(cause)));
    }, a => T.succeed(CH.zipRight_(CH.write(a), loop))));
    return loop;
  })));
}
//# sourceMappingURL=asyncEffect.js.map