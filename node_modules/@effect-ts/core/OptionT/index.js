"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = access;
exports.applicative = applicative;
exports.monad = monad;
exports.provide = provide;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index4 = /*#__PURE__*/require("../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/HKT/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(M) {
  const succeed = (0, _index4.succeedF)(M);
  return {
    any: () => succeed(O.some({})),
    flatten: x => M.flatten(M.map(o => o._tag === "None" ? succeed(O.none) : o.value)(x)),
    map: f => M.map(O.map(f))
  };
}

function applicative(M) {
  const succeed = (0, _index4.succeedF)(M);
  return {
    any: () => succeed(O.some({})),
    map: f => M.map(O.map(f)),
    both: fb => x => M.map(({
      tuple: [a, b]
    }) => O.zip_(a, b))(M.both(fb)(x))
  };
}

function access(M) {
  return {
    access: f => M.map(O.some)(M.access(f))
  };
}

function provide(M) {
  return {
    provide: M.provide
  };
}
//# sourceMappingURL=index.js.map