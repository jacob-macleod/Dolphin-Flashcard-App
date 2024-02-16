"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = exports.fibers = exports.TestAnnotation = void 0;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Structural/index.js"));

var _index5 = /*#__PURE__*/require("../Int/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A type of annotation.
 */
class TestAnnotation {
  constructor(identifier, initial, combine) {
    this.identifier = identifier;
    this.initial = initial;
    this.combine = combine;
  }

  get [St.hashSym]() {
    return St.hash(this.identifier);
  }

  [St.equalsSym](that) {
    return that instanceof TestAnnotation && St.equals(this.identifier, that.identifier);
  }

}

exports.TestAnnotation = TestAnnotation;
const fibers = /*#__PURE__*/new TestAnnotation("fibers", /*#__PURE__*/E.leftW(0), compose);
exports.fibers = fibers;

function compose(left, right) {
  if (left._tag === "Left" && right._tag === "Left") {
    return E.left((0, _index5.Int)(left.left + right.left));
  } else if (left._tag === "Right" && right._tag === "Right") {
    return E.right(Chunk.concat_(left.right, right.right));
  } else if (left._tag === "Right" && right._tag === "Left") {
    return E.left(right.left);
  } else {
    return E.right(right.right);
  }
}

const location = /*#__PURE__*/new TestAnnotation("location", /*#__PURE__*/List.empty(), List.concat_);
exports.location = location;
//# sourceMappingURL=index.js.map