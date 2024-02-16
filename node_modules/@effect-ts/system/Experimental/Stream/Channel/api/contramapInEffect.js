"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contramapInEffect = contramapInEffect;
exports.contramapInEffect_ = contramapInEffect_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ReadWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./readWith.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function contramapInMReader(f) {
  return ReadWith.readWith(_in => ZipRight.zipRight_(C.chain_(C.fromEffect(f(_in)), _ => C.write(_)), contramapInMReader(f)), err => C.fail(err), done => C.end(done));
}

function contramapInEffect_(self, f) {
  return C.pipeTo_(contramapInMReader(f), self);
}
/**
 * @ets_data_first contramapInEffect_
 */


function contramapInEffect(f) {
  return self => contramapInEffect_(self, f);
}
//# sourceMappingURL=contramapInEffect.js.map