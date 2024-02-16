"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = loop;
exports.loopUnit = loopUnit;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  return (body, __trace) => {
    return map.map_(loopInternal_(initial, cont, inc, body, __trace), x => Array.from(L.reverse(x)));
  };
}

function loopInternal_(initial, cont, inc, body, __trace) {
  return core.suspend(() => {
    if (cont(initial)) {
      return core.chain_(body(initial), a => map.map_(loopInternal_(inc(initial), cont, inc, body), as => {
        L.push_(as, a);
        return as;
      }));
    }

    return core.succeedWith(() => L.emptyPushable());
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
  return (body, __trace) => {
    return core.suspend(() => {
      if (cont(initial)) {
        return core.chain_(body(initial), () => loopUnit(inc(initial), cont, inc)(body));
      }

      return core.unit;
    }, __trace);
  };
}
//# sourceMappingURL=loop.js.map