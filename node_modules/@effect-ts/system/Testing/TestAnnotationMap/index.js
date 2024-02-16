"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestAnnotationMap = void 0;
exports.annotate = annotate;
exports.concat = concat;
exports.get = get;
exports.overwrite = overwrite;
exports.update = update;

var HashMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/HashMap/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class TestAnnotationMap {
  constructor(map) {
    this.map = map;
  }

}

exports.TestAnnotationMap = TestAnnotationMap;
TestAnnotationMap.empty = /*#__PURE__*/new TestAnnotationMap( /*#__PURE__*/HashMap.make());

function concat(self, that) {
  const l = L.from(self.map);
  const r = L.from(that.map);
  return new TestAnnotationMap(L.reduce_(L.concat_(l, r), TestAnnotationMap.empty.map, (acc, [key, value]) => HashMap.set_(acc, key, O.fold_(HashMap.get_(acc, key), () => value, x => key.combine(x, value)))));
}

function get(key) {
  return tam => O.fold_(HashMap.get_(tam.map, key), () => key.initial, a => a);
}

function overwrite(key, value) {
  return tam => new TestAnnotationMap(HashMap.set_(tam.map, key, value));
}

function update(key, f) {
  return tam => overwrite(key, f(get(key)(tam)))(tam);
}

function annotate(key, value) {
  return tam => update(key, _ => key.combine(_, value))(tam);
}
//# sourceMappingURL=index.js.map