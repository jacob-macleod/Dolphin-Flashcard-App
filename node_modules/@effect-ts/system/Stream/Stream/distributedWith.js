"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributedWith = distributedWith;
exports.distributedWith_ = distributedWith_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Map/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _distributedWithDynamic = /*#__PURE__*/require("./distributedWithDynamic.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */
function distributedWith(n, maximumLag, decide) {
  return self => distributedWith_(self, n, maximumLag, decide);
}
/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */


function distributedWith_(self, n, maximumLag, decide) {
  return M.chain_(M.fromEffect(P.make()), prom => M.chain_((0, _distributedWithDynamic.distributedWithDynamic_)(self, maximumLag, o => T.chain_(P.await(prom), _ => _(o)), _ => T.unit), next => M.fromEffect(T.chain_(A.mapEffect_(A.map_(A.range(0, n - 1), id => T.map_(next, ({
    tuple: [key, queue]
  }) => [[key, id], queue])), _index3.identity), entries => {
    const [mappings, queues] = A.reduceRight_(entries, [Map.empty, A.empty()], ([mapping, queue], [mappings, queues]) => [Map.insert(mapping[0], mapping[1])(mappings), A.concat_(A.single(queue), queues)]);
    return T.as_(P.succeed_(prom, o => // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    T.map_(decide(o), f => key => f(mappings.get(key)))), queues);
  }))));
}
//# sourceMappingURL=distributedWith.js.map