"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenExitOption = flattenExitOption;

var _index = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/BufferedPull/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/Pull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function flattenExitOption(self) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "upstream", () => M.mapM_(self.proc, BP.make)), "done", () => T.toManaged(Ref.makeRef(false))), ({
    done,
    upstream
  }) => T.chain_(done.get, _ => {
    if (_) {
      return P.end;
    } else {
      return T.foldM_(BP.pullElement(upstream), O.fold(() => T.zipRight_(done.set(true), P.end), e => P.fail(e)), os => T.foldM_(T.done(os), O.fold(() => T.zipRight_(done.set(true), P.end), e => P.fail(e)), _ => P.emit(_)));
    }
  })));
}
//# sourceMappingURL=flattenExitOption.js.map