"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = access;
exports.applicative = applicative;
exports.associativeEither = associativeEither;
exports.fail = fail;
exports.monad = monad;
exports.provide = provide;
exports.run = run;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _index3 = /*#__PURE__*/require("../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/HKT/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Reader/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(M) {
  return {
    any: () => M.any,
    flatten: ffa => r => M.flatten(M.map(f => f(r))(ffa(r))),
    map: f => fa => r => M.map(f)(fa(r))
  };
}

function access(M) {
  return {
    access: f => R.map((0, _index3.succeedF)(M))(R.access(f))
  };
}

function associativeEither(M) {
  return {
    orElseEither: fb => fa => r => M.orElseEither(() => fb()(r))(fa(r))
  };
}

function provide(M) {
  return {
    provide: r => R.provideSome(() => r)
  };
}

function applicative(M) {
  return {
    any: () => R.succeed(M.any()),
    map: f => R.map(M.map(f)),
    both: fb => fa => R.map(({
      tuple: [_a, _b]
    }) => M.both(_b)(_a))(R.zip(fb)(fa))
  };
}

function run(M) {
  return {
    either: fa => R.map(M.either)(fa)
  };
}

function fail(M) {
  return {
    fail: e => R.succeed(M.fail(e))
  };
}
//# sourceMappingURL=index.js.map