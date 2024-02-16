"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Take = void 0;
exports.chunk = chunk;
exports.die = die;
exports.dieMessage = dieMessage;
exports.done = done;
exports.end = void 0;
exports.fail = fail;
exports.failCause = failCause;
exports.fold = fold;
exports.foldEffect = foldEffect;
exports.foldEffect_ = foldEffect_;
exports.fold_ = fold_;
exports.fromEffect = fromEffect;
exports.fromExit = fromExit;
exports.fromPull = fromPull;
exports.halt = halt;
exports.isDone = isDone;
exports.isFailure = isFailure;
exports.isSuccess = isSuccess;
exports.map = map;
exports.map_ = map_;
exports.single = single;
exports.tap = tap;
exports.tap_ = tap_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var _commons = /*#__PURE__*/require("../../../Effect/commons.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Exit/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A `Take<E, A>` represents a single `take` from a queue modeling a stream of
 * values. A `Take` may be a failure cause `Cause<E>`, an chunk value `A`
 * or an end-of-stream marker.
 */
class Take {
  constructor(exit) {
    this.exit = exit;
  }

}
/**
 * Transforms `Take[E, A]` to `Effect[R, E, B]`.
 */


exports.Take = Take;

function done(self) {
  return T.done(self.exit);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */


function fold_(self, end, error, value) {
  return Ex.fold_(self.exit, _ => O.fold_(C.flipCauseOption(_), () => end, error), value);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 *
 * @ets_data_first fold_
 */


function fold(end, error, value) {
  return self => fold_(self, end, error, value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */


function foldEffect_(self, end, error, value) {
  return Ex.foldM_(self.exit, _ => O.fold_(C.flipCauseOption(_), () => end, error), value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 *
 * @ets_data_first foldEffect_
 */


function foldEffect(end, error, value) {
  return self => foldEffect_(self, end, error, value);
}
/**
 * Checks if this `take` is done (`Take.end`).
 */


function isDone(self) {
  return Ex.fold_(self.exit, _ => O.isNone(C.flipCauseOption(_)), _ => false);
}
/**
 * Checks if this `take` is a failure.
 */


function isFailure(self) {
  return Ex.fold_(self.exit, _ => O.isSome(C.flipCauseOption(_)), _ => false);
}
/**
 * Checks if this `take` is a success.
 */


function isSuccess(self) {
  return Ex.fold_(self.exit, _ => false, _ => true);
}
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 */


function map_(self, f) {
  return new Take(Ex.map_(self.exit, A.map(f)));
}
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 */


function tap_(self, f) {
  return T.asUnit(Ex.forEach_(self.exit, f));
}
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return self => tap_(self, f);
}
/**
 * Creates a `Take<never, A>` with a singleton chunk.
 */


function single(a) {
  return new Take(Ex.succeed(A.single(a)));
}
/**
 * Creates a `Take[Nothing, A]` with the specified chunk.
 */


function chunk(as) {
  return new Take(Ex.succeed(as));
}
/**
 * Creates a failing `Take<E, unknown>` with the specified failure.
 */


function fail(e) {
  return new Take(Ex.fail(O.some(e)));
}
/**
 * Creates a failing `Take[E, Nothing]` with the specified cause.
 */


function failCause(c) {
  return new Take(Ex.failCause(C.map_(c, O.some)));
}
/**
 * Creates an effect from `Effect<R, E,A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`. Creates a singleton chunk.
 */


function fromEffect(effect) {
  return T.foldCause_(effect, cause => halt(cause), single);
}
/**
 * Creates effect from `Pull<R, E, A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`, end of stream to `Take.end`.
 */


function fromPull(pull) {
  return T.foldCause_(pull, _ => O.fold_(C.flipCauseOption(_), () => end, halt), chunk);
}
/**
 * Creates a failing `Take<E, never>` with the specified cause.
 */


function halt(c) {
  return new Take(Ex.halt(C.map_(c, O.some)));
}
/**
 * Creates a failing `Take<never, never>` with the specified throwable.
 */


function die(e) {
  return new Take(Ex.die(e));
}
/**
 * Creates a failing `Take<never, never>` with the specified error message.
 */


function dieMessage(msg) {
  return new Take(Ex.die(new C.RuntimeError(msg)));
}
/**
 * Creates a `Take<E, A>` from `Exit<E, A>`.
 */


function fromExit(exit) {
  return new Take(Ex.map_(Ex.mapError_(exit, O.some), A.single));
}
/**
 * End-of-stream marker
 */


const end = /*#__PURE__*/new Take( /*#__PURE__*/Ex.fail(O.none));
exports.end = end;
//# sourceMappingURL=index.js.map