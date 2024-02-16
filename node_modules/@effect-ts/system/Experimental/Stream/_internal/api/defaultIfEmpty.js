"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIfEmpty = defaultIfEmpty;
exports.defaultIfEmpty_ = defaultIfEmpty_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Switches to the provided stream in case this one is empty.
 */
function defaultIfEmptyStream(self, stream) {
  const writer = () => CH.readWith(in_ => CK.isEmpty(in_) ? writer() : CH.zipRight_(CH.write(in_), CH.identity()), e => CH.fail(e), _ => stream.channel);

  return new C.Stream(self.channel[">>>"](writer()));
}
/**
 * Produces the specified chunk if this stream is empty.
 */


function defaultIfEmptyChunk(self, chunk) {
  return defaultIfEmptyStream(self, new C.Stream(CH.write(chunk)));
}
/**
 * Produces the specified element if this stream is empty.
 */


function defaultIfEmptyValue(self, a) {
  return defaultIfEmptyChunk(self, CK.single(a));
}

function defaultIfEmpty_(self, emptyValue) {
  if (CK.isChunk(emptyValue)) {
    return defaultIfEmptyChunk(self, emptyValue);
  }

  if (C.isStream(emptyValue)) {
    return defaultIfEmptyStream(self, emptyValue);
  }

  return defaultIfEmptyValue(self, emptyValue);
}

function defaultIfEmpty(emptyValue) {
  return self => defaultIfEmpty_(self, emptyValue);
}
//# sourceMappingURL=defaultIfEmpty.js.map