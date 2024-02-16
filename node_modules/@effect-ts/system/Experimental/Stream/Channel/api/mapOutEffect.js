"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOutEffect = mapOutEffect;
exports.mapOutEffect_ = mapOutEffect_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ReadWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./readWith.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const mapOutMReader = f => ReadWith.readWith(out => ZipRight.zipRight_(C.chain_(C.fromEffect(f(out)), _ => C.write(_)), mapOutMReader(f)), e => C.fail(e), z => C.end(z));

function mapOutEffect_(self, f) {
  return C.pipeTo_(self, mapOutMReader(f));
}
/**
 * @ets_data_first mapOutEffect_
 */


function mapOutEffect(f) {
  return self => mapOutEffect_(self, f);
}
//# sourceMappingURL=mapOutEffect.js.map