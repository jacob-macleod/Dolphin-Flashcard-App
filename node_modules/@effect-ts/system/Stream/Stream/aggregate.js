"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregate = aggregate;
exports.aggregate_ = aggregate_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var Option = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */
function aggregate_(self, transducer) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => self.proc), "push", () => transducer.push), "done", () => Ref.makeManagedRef(false)), "run", ({
    done,
    pull,
    push
  }) => T.chain_(done.get, b => b ? Pull.end : T.foldM_(pull, Option.fold(() => T.chain_(done.set(true), () => T.asSomeError(push(Option.none))), e => Pull.fail(e)), os => T.asSomeError(push(Option.some(os)))))), ({
    run
  }) => run));
}
/**
 * Applies an aggregator to the stream, which converts one or more elements
 * of type `A` into elements of type `B`.
 */


function aggregate(transducer) {
  return self => aggregate_(self, transducer);
}
//# sourceMappingURL=aggregate.js.map