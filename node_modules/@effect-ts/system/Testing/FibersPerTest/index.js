"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fibersPerTest = fibersPerTest;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var SS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/SortedSet/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../Fiber/index.js");

var _index6 = /*#__PURE__*/require("../../Function/index.js");

var Supervisor = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Supervisor/index.js"));

var _index8 = /*#__PURE__*/require("../../Support/AtomicReference/index.js");

var Annotations = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Annotations/index.js"));

var _index10 = /*#__PURE__*/require("../Int/index.js");

var _index11 = /*#__PURE__*/require("../TestAnnotation/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function fibersPerTest(self) {
  const acquire = T.tap_(T.succeedWith(() => new _index8.AtomicReference(SS.make((0, _index5.runtimeOrd)()))), ref => Annotations.annotate(_index11.fibers, E.right(Chunk.single(ref))));
  const release = T.chain_(Annotations.get(_index11.fibers), f => {
    switch (f._tag) {
      case "Left":
        return T.unit;

      case "Right":
        return T.tap_(T.map_(T.map_(T.forEach_(f.right, _ => T.succeedWith(() => _.get)), Chunk.reduce(SS.make((0, _index5.runtimeOrd)()), SS.union_)), SS.size), n => Annotations.annotate(_index11.fibers, E.left((0, _index10.Int)(n))));
    }
  });
  return T.bracket_(acquire, ref => T.chain_(Supervisor.fibersIn(ref), supervisor => T.supervised_(self, supervisor)), () => release);
}
//# sourceMappingURL=index.js.map