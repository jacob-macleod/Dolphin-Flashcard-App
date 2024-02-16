"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runIntoElementsManaged = runIntoElementsManaged;
exports.runIntoElementsManaged_ = runIntoElementsManaged_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/*
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
function runIntoElementsManaged_(self, queue) {
  const writer = () => CH.readWith(in_ => CH.zipRight_(CK.reduce_(in_, CH.unit, (channel, a) => CH.zipRight_(channel, CH.write(Ex.succeed(a)))), writer()), err => CH.write(Ex.fail(O.some(err))), _ => CH.write(Ex.fail(O.none)));

  return M.asUnit(CH.runManaged(CH.drain(CH.mapOutEffect_(self.channel[">>>"](writer()), _ => Q.offer_(queue, _)))));
}
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoElementsManaged_
 */


function runIntoElementsManaged(queue) {
  return self => runIntoElementsManaged_(self, queue);
}
//# sourceMappingURL=runIntoElementsManaged.js.map