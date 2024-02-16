"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfoldChunkM = unfoldChunkM;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */
function unfoldChunkM(z, f) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "done", () => Ref.makeManagedRef(false)), "ref", () => Ref.makeManagedRef(z)), "pull", ({
    done,
    ref
  }) => T.chain_(done.get, isDone => isDone ? Pull.end : T.foldM_(T.chain_(ref.get, f), Pull.fail, O.fold(() => T.chain_(done.set(true), () => Pull.end), ({
    tuple: [a, z]
  }) => T.map_(ref.set(z), () => a))))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=unfoldChunkM.js.map