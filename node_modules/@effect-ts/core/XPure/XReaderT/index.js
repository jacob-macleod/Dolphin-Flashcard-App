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

require("../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _index3 = /*#__PURE__*/require("../../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/HKT/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../XReader/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(M) {
  return {
    any: () => R.succeed(M.any()),
    flatten: ffa => R.map(M.flatten)(R.access(e => M.map(R.runEnv(e))(R.runEnv(e)(ffa)))),
    map: f => R.map(M.map(f))
  };
}

function access(M) {
  return {
    access: x => R.map((0, _index3.succeedF)(M))(R.access(x))
  };
}

function provide(_) {
  return {
    provide: r => R.provideSome(() => r)
  };
}

function applicative(M) {
  return {
    any: () => R.succeed(M.any()),
    map: f => R.map(M.map(f)),
    both: fb => x => R.map(({
      tuple: [_a, _b]
    }) => M.both(_b)(_a))(R.zip(fb)(x))
  };
}

function run(M) {
  return {
    either: x => R.map(M.either)(x)
  };
}

function fail(M) {
  return {
    fail: x => R.succeed(M.fail(x))
  };
}
//# sourceMappingURL=index.js.map