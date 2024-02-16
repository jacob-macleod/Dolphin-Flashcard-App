"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Failure", {
  enumerable: true,
  get: function () {
    return _exit.Failure;
  }
});
Object.defineProperty(exports, "Success", {
  enumerable: true,
  get: function () {
    return _exit.Success;
  }
});
exports.ap = ap;
exports.ap_ = ap_;
exports.as = as;
exports.as_ = as_;
exports.assertsFailure = assertsFailure;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.chain = chain;
exports.chain_ = chain_;
exports.collectAll = collectAll;
exports.collectAllPar = collectAllPar;
exports.die = die;
exports.exists = exists;
exports.exists_ = exists_;
exports.fail = fail;
exports.failCause = failCause;
exports.flatten = flatten;
exports.fold = fold;
exports.fold_ = fold_;
exports.fromEither = fromEither;
exports.fromOption = fromOption;
exports.getOrElse = getOrElse;
exports.getOrElse_ = getOrElse_;
exports.halt = halt;
exports.interrupt = interrupt;
exports.interrupted = interrupted;
exports.map = map;
exports.mapBoth = mapBoth;
exports.mapBoth_ = mapBoth_;
exports.mapError = mapError;
exports.mapErrorCause = mapErrorCause;
exports.mapErrorCause_ = mapErrorCause_;
exports.mapError_ = mapError_;
exports.map_ = map_;
exports.orElseFail = orElseFail;
exports.orElseFail_ = orElseFail_;
exports.succeed = succeed;
exports.succeeded = succeeded;
exports.toEither = toEither;
exports.unit = void 0;
exports.untraced = untraced;
exports.zip = zip;
exports.zipLeft = zipLeft;
exports.zipLeft_ = zipLeft_;
exports.zipPar = zipPar;
exports.zipParLeft = zipParLeft;
exports.zipParLeft_ = zipParLeft_;
exports.zipParRight = zipParRight;
exports.zipParRight_ = zipParRight_;
exports.zipPar_ = zipPar_;
exports.zipRight = zipRight;
exports.zipRight_ = zipRight_;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var _errors = /*#__PURE__*/require("../Cause/errors.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _exit = /*#__PURE__*/require("./exit.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applicative's ap
 */
function ap_(fa, fab) {
  return chain_(fab, f => map_(fa, a => f(a)));
}
/**
 * Applicative's ap
 *
 * @ets_data_first ap_
 */


function ap(fa) {
  return fab => ap_(fa, fab);
}
/**
 * Replaces the success value with the one provided.
 */


function as_(exit, b) {
  return map_(exit, () => b);
}
/**
 * Replaces the success value with the one provided.
 *
 * @ets_data_first as_
 */


function as(b) {
  return exit => as_(exit, b);
}
/**
 * Maps over both the error and value type.
 */


function bimap_(exit, f, g) {
  return mapError(f)(map(g)(exit));
}
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first bimap_
 */


function bimap(f, g) {
  return exit => bimap_(exit, f, g);
}
/**
 * Flat maps over the value type.
 */


function chain_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return exit;
      }

    case "Success":
      {
        return f(exit.value);
      }
  }
}
/**
 * Flat maps over the value type.
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return exit => chain_(exit, f);
}
/**
 * Collects all the success states and merges sequentially the causes
 */


function collectAll(...exits) {
  return O.map_(A.head(exits), head => map(A.reverse)(A.reduce_(A.drop_(exits, 1), map(x => [x])(head), (acc, el) => zipWith(el, (acc, el) => [el, ...acc], C.combineSeq)(acc))));
}
/**
 * Zips this together with the specified result using the combination functions.
 */


function zipWith_(exit, that, f, g) {
  switch (exit._tag) {
    case "Failure":
      {
        switch (that._tag) {
          case "Success":
            {
              return exit;
            }

          case "Failure":
            {
              return halt(g(exit.cause, that.cause));
            }
        }
      }
    // eslint-disable-next-line no-fallthrough

    case "Success":
      {
        switch (that._tag) {
          case "Success":
            {
              return succeed(f(exit.value, that.value));
            }

          case "Failure":
            {
              return that;
            }
        }
      }
  }
}
/**
 * Zips this together with the specified result using the combination functions.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f, g) {
  return exit => zipWith_(exit, that, f, g);
}
/**
 * Collects all the success states and merges the causes in parallel
 */


function collectAllPar(...exits) {
  return O.map_(A.head(exits), head => map(A.reverse)(A.reduce_(A.drop_(exits, 1), map(x => [x])(head), (acc, el) => zipWith(el, (acc, el) => [el, ...acc], C.combinePar)(acc))));
}
/**
 * Construct an Exit with an unchecked cause containing the specified error
 */


function die(error) {
  return halt(C.die(error));
}
/**
 * Returns f(a) if the exit is successful
 */


function exists_(exit, f) {
  return fold(() => false, f)(exit);
}
/**
 * Returns f(a) if the exit is successful
 *
 * @ets_data_first exists_
 */


function exists(f) {
  return exit => exists_(exit, f);
}
/**
 * Constructs a failed exit with the specified checked error
 */


function fail(e) {
  return halt(C.fail(e));
}
/**
 * Constructs a failed exit with the specified cause
 */


function failCause(cause) {
  return new _exit.Failure(cause);
}
/**
 * Flatten nested Exits
 */


function flatten(exit) {
  return chain(_index4.identity)(exit);
}
/**
 * Folds over the value or cause.
 */


function fold_(exit, failed, succeed) {
  switch (exit._tag) {
    case "Success":
      {
        return succeed(exit.value);
      }

    case "Failure":
      {
        return failed(exit.cause);
      }
  }
}
/**
 * Folds over the value or cause.
 *
 * @ets_data_first fold_
 */


function fold(failed, succeed) {
  return exit => fold_(exit, failed, succeed);
}
/**
 * Embeds Either's Error & Success in an Exit
 */


function fromEither(e) {
  return e._tag === "Left" ? fail(e.left) : succeed(e.right);
}
/**
 * Embeds an option result into an Exit with the specified error using onNone
 */


function fromOption(onNone) {
  return a => a._tag === "None" ? fail(onNone()) : succeed(a.value);
}
/**
 * Get successful result falling back to orElse result in case of failure
 */


function getOrElse_(exit, orElse) {
  switch (exit._tag) {
    case "Success":
      {
        return exit.value;
      }

    case "Failure":
      {
        return orElse(exit.cause);
      }
  }
}
/**
 * Get successful result falling back to orElse result in case of failure
 *
 * @ets_data_first getOrElse_
 */


function getOrElse(orElse) {
  return exit => getOrElse_(exit, orElse);
}
/**
 * Constructs a failed exit with the specified cause
 */


function halt(cause) {
  return new _exit.Failure(cause);
}
/**
 * Constructs an exit with the specified interruption state
 */


function interrupt(id) {
  return halt(C.interrupt(id));
}
/**
 * Returns if Exit contains an interruption state
 */


function interrupted(exit) {
  switch (exit._tag) {
    case "Success":
      {
        return false;
      }

    case "Failure":
      {
        return C.interrupted(exit.cause);
      }
  }
}
/**
 * Maps over the value type.
 */


function map_(exit, f) {
  return chain(a => succeed(f(a)))(exit);
}
/**
 * Maps over the value type.
 *
 * @ets_data_first map_
 */


function map(f) {
  return exit => map_(exit, f);
}
/**
 * Maps over the error type.
 */


function mapError_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return halt(C.map(f)(exit.cause));
      }

    case "Success":
      {
        return exit;
      }
  }
}
/**
 * Maps over the error type.
 *
 * @ets_data_first mapError_
 */


function mapError(f) {
  return exit => mapError_(exit, f);
}
/**
 * Maps over the cause type.
 */


function mapErrorCause_(exit, f) {
  switch (exit._tag) {
    case "Failure":
      {
        return halt(f(exit.cause));
      }

    case "Success":
      {
        return exit;
      }
  }
}
/**
 * Maps over the cause type.
 *
 * @ets_data_first mapErrorCause_
 */


function mapErrorCause(f) {
  return exit => mapErrorCause_(exit, f);
}
/**
 * Replaces the error value with the one provided.
 */


function orElseFail_(exit, e) {
  return mapError(() => e)(exit);
}
/**
 * Replaces the error value with the one provided.
 *
 * @ets_data_first orElseFail_
 */


function orElseFail(e) {
  return exit => orElseFail_(exit, e);
}
/**
 * Construct a succeeded exit with the specified value
 */


function succeed(a) {
  return new _exit.Success(a);
}
/**
 * Returns if an exit is succeeded
 */


function succeeded(exit) {
  switch (exit._tag) {
    case "Failure":
      {
        return false;
      }

    case "Success":
      {
        return true;
      }
  }
}
/**
 * Converts the `Exit` to an `Either<FiberFailure, A>`, by wrapping the
 * cause in `FiberFailure` (if the result is failed).
 */


function toEither(exit) {
  switch (exit._tag) {
    case "Success":
      {
        return E.right(exit.value);
      }

    case "Failure":
      {
        return E.left(new _errors.FiberFailure(exit.cause));
      }
  }
}
/**
 * Discards the value.
 */


const unit = /*#__PURE__*/succeed(undefined);
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 */

exports.unit = unit;

function zip_(exit, that) {
  return zipWith(that, (a, b) => Tp.tuple(a, b), C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zip_
 */


function zip(that) {
  return exit => zip_(exit, that);
}
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */


function zipLeft_(exit, that) {
  return zipWith(that, (a, _) => a, C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipLeft_
 */


function zipLeft(that) {
  return exit => zipLeft_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 */


function zipPar_(exit, that) {
  return zipWith(that, (a, b) => Tp.tuple(a, b), C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipPar_
 */


function zipPar(that) {
  return exit => zipPar_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 */


function zipParLeft_(exit, that) {
  return zipWith(that, (a, _) => a, C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result discarding the second element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParLeft_
 */


function zipParLeft(that) {
  return exit => zipParLeft_(exit, that);
}
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */


function zipParRight_(exit, that) {
  return zipWith(that, (_, b) => b, C.combinePar)(exit);
}
/**
 * Parallelly zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipParRight_
 */


function zipParRight(that) {
  return exit => zipParRight_(exit, that);
}
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 */


function zipRight_(exit, that) {
  return zipWith(that, (_, b) => b, C.combineSeq)(exit);
}
/**
 * Sequentially zips the this result with the specified result discarding the first element of the tuple or else returns the failed `Cause[E1]`
 *
 * @ets_data_first zipRight_
 */


function zipRight(that) {
  return exit => zipRight_(exit, that);
}
/**
 * Returns an untraced exit value.
 */


function untraced(self) {
  return self._tag === "Success" ? self : halt(C.untraced(self.cause));
}
/**
 * Asserts an exit is a failure
 */


function assertsFailure(exit) {
  if (exit._tag === "Success") {
    throw new Error("expected a failed exit and got success");
  }
}
/**
 * Maps over both the error and value type.
 */


function mapBoth_(self, f, g) {
  return map_(mapError_(self, f), g);
}
/**
 * Maps over both the error and value type.
 *
 * @ets_data_first mapBoth_
 */


function mapBoth(f, g) {
  return self => mapBoth_(self, f, g);
}
//# sourceMappingURL=core.js.map