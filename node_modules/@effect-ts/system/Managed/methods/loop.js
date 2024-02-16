"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = loop;
exports.loopUnit = loopUnit;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _core = /*#__PURE__*/require("../core.js");

var _succeed = /*#__PURE__*/require("../succeed.js");

var _api = /*#__PURE__*/require("./api.js");

var _suspend = /*#__PURE__*/require("./suspend.js");

// ets_tracing: off

/**
 * Loops with the specified effectual function, collecting the results into a
 * list. The moral equivalent of:
 *
 * ```
 * let s  = initial
 * let as = [] as readonly A[]
 *
 * while (cont(s)) {
 *   as = [body(s), ...as]
 *   s  = inc(s)
 * }
 *
 * A.reverse(as)
 * ```
 */
function loop(initial, cont, inc) {
  return (body, __trace) => (0, _suspend.suspend)(() => {
    if (cont(initial)) {
      return (0, _core.chain_)(body(initial), a => (0, _core.map)(as => [a, ...as])(loop(inc(initial), cont, inc)(body)));
    }

    return (0, _succeed.succeed)([]);
  }, __trace);
}
/**
 * Loops with the specified effectual function purely for its effects. The
 * moral equivalent of:
 *
 * ```
 * var s = initial
 *
 * while (cont(s)) {
 *   body(s)
 *   s = inc(s)
 * }
 * ```
 */


function loopUnit(initial, cont, inc) {
  return (body, __trace) => (0, _suspend.suspend)(() => {
    if (cont(initial)) {
      return (0, _core.chain_)(body(initial), () => loopUnit(inc(initial), cont, inc)(body));
    }

    return _api.unit;
  }, __trace);
}
//# sourceMappingURL=loop.js.map