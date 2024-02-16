"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributedWith = distributedWith;
exports.distributedWith_ = distributedWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/HashMap/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index6 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var DistributedWithDynamic = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./distributedWithDynamic.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */
function distributedWith_(self, n, maximumLag, decide) {
  return M.chain_(T.toManaged(P.make()), prom => {
    return M.chain_(DistributedWithDynamic.distributedWithDynamic_(self, maximumLag, a => T.chain_(P.await(prom), _ => _(a)), _ => T.unit), next => T.toManaged(T.chain_(T.collectAll(CK.map_(CK.range(0, n - 1), id => T.map_(next, ({
      tuple: [key, queue]
    }) => Tp.tuple(Tp.tuple(key, id), queue)))), entries => {
      const {
        tuple: [mappings, queues]
      } = CK.reduceRight_(entries, Tp.tuple(HM.make(), L.empty()), ({
        tuple: [mapping, queue]
      }, {
        tuple: [mappings, queues]
      }) => Tp.tuple(HM.set_(mappings, Tp.get_(mapping, 0), Tp.get_(mapping, 1)), L.prepend_(queues, queue)));
      return T.as_(P.succeed_(prom, a => T.map_(decide(a), f => key => f(HM.unsafeGet_(mappings, key)))), queues);
    })));
  });
}
/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 *
 * @ets_data_first distributedWith_
 */


function distributedWith(n, maximumLag, decide) {
  return self => distributedWith_(self, n, maximumLag, decide);
}
//# sourceMappingURL=distributedWith.js.map