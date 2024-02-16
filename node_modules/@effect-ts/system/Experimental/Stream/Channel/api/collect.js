"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collect_ = collect_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ReadWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./readWith.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 */
function collect_(self, f) {
  const collector = ReadWith.readWith(o => O.fold_(f(o), () => collector, out2 => ZipRight.zipRight_(C.write(out2), collector)), e => C.fail(e), z => C.end(z));
  return C.pipeTo_(self, collector);
}
/**
 * Returns a new channel, which is the same as this one, except its outputs are filtered and
 * transformed by the specified partial function.
 *
 * @ets_data_first collect_
 */


function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.js.map