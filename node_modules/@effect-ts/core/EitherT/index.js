"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = access;
exports.applicative = applicative;
exports.fail = fail;
exports.monad = monad;
exports.provide = provide;
exports.run = run;

require("../Operator/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _index4 = /*#__PURE__*/require("../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/HKT/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(M) {
  const succeed = (0, _index4.succeedF)(M);
  return {
    any: () => (0, _index4.succeedF)(M)(E.right({})),
    flatten: ffa => M.flatten(M.map(e => e._tag === "Left" ? succeed(e) : e.right)(ffa)),
    map: f => M.map(E.map(f))
  };
}

function applicative(M) {
  return {
    any: () => (0, _index4.succeedF)(M)(E.right({})),
    map: f => M.map(E.map(f)),
    both: fb => x => M.map(({
      tuple: [ea, eb]
    }) => E.AssociativeBoth.both(eb)(ea))(M.both(fb)(x))
  };
}

function run(M) {
  return {
    either: M.map(E.Run.either)
  };
}

function fail(M) {
  const succeed = (0, _index4.succeedF)(M);
  return {
    fail: x => succeed(E.left(x))
  };
}

function access(M) {
  return {
    access: f => M.map(E.right)(M.access(f))
  };
}

function provide(M) {
  return {
    provide: M.provide
  };
}
//# sourceMappingURL=index.js.map