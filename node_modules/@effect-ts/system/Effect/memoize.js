"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = memoize;
exports.memoizeEq = memoizeEq;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _await = /*#__PURE__*/require("../Promise/await.js");

var _make = /*#__PURE__*/require("../Promise/make.js");

var RefM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../RefM/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var tap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tap.js"));

var to = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./to.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a memoized version of the specified effectual function.
 */
function memoize(f, __trace) {
  return map.map_(RefM.makeRefM(new Map()), ref => a => map.map_(Do.bind_(Do.bind_(Do.do, "promise", () => RefM.modify(m => {
    const memo = m.get(a);

    if (memo) {
      return (0, _core.succeed)(Tp.tuple(memo, m));
    }

    return map.map_(tap.tap_(Do.bind_(Do.do, "promise", () => (0, _make.make)()), ({
      promise
    }) => (0, _core.fork)(to.to_(f(a), promise))), ({
      promise
    }) => Tp.tuple(promise, m.set(a, promise)));
  })(ref)), "b", ({
    promise
  }) => (0, _await.await)(promise)), ({
    b
  }) => b), __trace);
}
/**
 * Returns a memoized version of the specified effectual function.
 *
 * This variant uses the compare function to compare `A`
 */


function memoizeEq(compare) {
  return f => map.map_(RefM.makeRefM(new Map()), ref => a => map.map_(Do.bind_(Do.bind_(Do.do, "promise", () => RefM.modify(m => {
    for (const [k, v] of m) {
      if (compare(k)(a)) {
        return (0, _core.succeed)(Tp.tuple(v, m));
      }
    }

    return map.map_(tap.tap_(Do.bind_(Do.do, "promise", () => (0, _make.make)()), ({
      promise
    }) => (0, _core.fork)(to.to_(f(a), promise))), ({
      promise
    }) => Tp.tuple(promise, m.set(a, promise)));
  })(ref)), "b", ({
    promise
  }) => (0, _await.await)(promise)), ({
    b
  }) => b));
}
//# sourceMappingURL=memoize.js.map