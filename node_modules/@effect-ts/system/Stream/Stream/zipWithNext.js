"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithNext = zipWithNext;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips each element with the next element if present.
 */
function zipWithNext(self) {
  return new _definitions.Stream(M.map_(M.let_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "ref", () => T.toManaged(Ref.makeRef(O.none))), "last", ({
    ref
  }) => T.map_(T.map_(T.some(Ref.getAndSet_(ref, O.none)), _ => Tp.tuple(_, O.none)), A.single)), "pull", ({
    chunks,
    ref
  }) => {
    return T.map_(T.bind_(T.tap_(T.let_(T.bind_(T.bind_(T.do, "prev", () => ref.get), "chunk", () => chunks), "sc", ({
      chunk,
      prev
    }) => A.mapAccum_(chunk, prev, (prev, curr) => Tp.tuple(O.some(curr), O.map_(prev, _ => Tp.tuple(_, curr))))), ({
      sc
    }) => ref.set(sc.get(0))), "result", ({
      sc
    }) => Pull.emitChunk(A.collect_(sc.get(1), O.fold(() => O.none, ({
      tuple: [prev, curr]
    }) => O.some(Tp.tuple(prev, O.some(curr))))))), ({
      result
    }) => result);
  }), ({
    last,
    pull
  }) => T.orElseOptional_(pull, () => last)));
}
//# sourceMappingURL=zipWithNext.js.map