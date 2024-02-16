"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catch = _catch;
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;
exports.catchTag = catchTag;
exports.catchTag_ = catchTag_;
exports.catch_ = catch_;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

// ets_tracing: off

/**
 * Recovers from all errors.
 */
function catchAll_(effect, f, __trace) {
  return (0, _foldM.foldM_)(effect, f, _core.succeed, __trace);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */


function catchAll(f, __trace) {
  return effect => catchAll_(effect, f, __trace);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */


function _catch(tag, k, f, __trace) {
  return self => catchAll_(self, e => {
    if (tag in e && e[tag] === k) {
      return f(e);
    }

    return (0, _fail.fail)(e);
  }, __trace);
}
/**
 * Recovers from specified error.
 */


function catch_(self, tag, k, f, __trace) {
  return catchAll_(self, e => {
    if (tag in e && e[tag] === k) {
      return f(e);
    }

    return (0, _fail.fail)(e);
  }, __trace);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */


function catchTag(k, f, __trace) {
  return self => catchTag_(self, k, f, __trace);
}
/**
 * Recovers from specified error.
 */


function catchTag_(self, k, f, __trace) {
  return catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return (0, _fail.fail)(e);
  }, __trace);
}
//# sourceMappingURL=catchAll.js.map