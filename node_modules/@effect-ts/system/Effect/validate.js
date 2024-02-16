"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.validateExec = validateExec;
exports.validateExec_ = validateExec_;
exports.validatePar = validatePar;
exports.validateParN = validateParN;
exports.validateParN_ = validateParN_;
exports.validatePar_ = validatePar_;
exports.validate_ = validate_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _absolve = /*#__PURE__*/require("./absolve.js");

var _either = /*#__PURE__*/require("./either.js");

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */
function validate_(as, f, __trace) {
  return (0, _absolve.absolve)((0, _map.map_)((0, _exclForEach.forEach_)(as, a => (0, _either.either)(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */


function validatePar_(as, f, __trace) {
  return (0, _absolve.absolve)((0, _map.map_)((0, _exclForEach.forEachPar_)(as, a => (0, _either.either)(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */


function validateParN_(as, n, f, __trace) {
  return (0, _absolve.absolve)((0, _map.map_)((0, _exclForEach.forEachParN_)(as, n, a => (0, _either.either)(f(a))), mergeExits()), __trace);
}

function mergeExits() {
  return exits => {
    let errors = Chunk.empty();
    let results = Chunk.empty();

    for (const e of exits) {
      if (e._tag === "Left") {
        errors = Chunk.append_(errors, e.left);
      } else {
        results = Chunk.append_(results, e.right);
      }
    }

    if (!Chunk.isEmpty(errors)) {
      return E.left(errors);
    } else {
      return E.right(results);
    }
  };
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 */


function validateExec_(as, es, f, __trace) {
  return (0, _absolve.absolve)((0, _map.map_)((0, _exclForEach.forEachExec_)(as, es, a => (0, _either.either)(f(a))), mergeExits()), __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validate_
 */


function validate(f, __trace) {
  return as => validate_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validatePar_
 */


function validatePar(f, __trace) {
  return as => validatePar_(as, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateParN_
 */


function validateParN(n, f, __trace) {
  return as => validateParN_(as, n, f, __trace);
}
/**
 * Feeds elements of type `A` to `f` and accumulates all errors in error
 * channel or successes in success channel.
 *
 * This combinator is lossy meaning that if there are errors all successes
 * will be lost.
 *
 * @ets_data_first validateExec_
 */


function validateExec(es, f, __trace) {
  return as => validateExec_(as, es, f, __trace);
}
//# sourceMappingURL=validate.js.map