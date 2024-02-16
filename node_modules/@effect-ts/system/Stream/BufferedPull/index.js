"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferedPull = void 0;
exports.ifNotDone = ifNotDone;
exports.ifNotDone_ = ifNotDone_;
exports.make = make;
exports.pullChunk = pullChunk;
exports.pullElement = pullElement;
exports.update = update;

require("../../Operator/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class BufferedPull {
  constructor(upstream, done, cursor) {
    this.upstream = upstream;
    this.done = done;
    this.cursor = cursor;
  }

}

exports.BufferedPull = BufferedPull;

function ifNotDone_(self, fa) {
  return T.chain_(self.done.get, b => b ? T.fail(O.none) : fa);
}

function ifNotDone(fa) {
  return self => ifNotDone_(self, fa);
}

function update(self) {
  return ifNotDone_(self, T.foldM_(self.upstream, O.fold(() => T.chain_(self.done.set(true), () => Pull.end), e => Pull.fail(e)), a => self.cursor.set(Tp.tuple(a, 0))));
}

function pullElement(self) {
  return ifNotDone_(self, T.flatten(R.modify_(self.cursor, ({
    tuple: [c, i]
  }) => {
    if (i >= A.size(c)) {
      return Tp.tuple(T.chain_(update(self), () => pullElement(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.unsafeGet_(c, i)), Tp.tuple(c, i + 1));
    }
  })));
}

function pullChunk(self) {
  return ifNotDone_(self, T.flatten(R.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.chain_(update(self), () => pullChunk(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.drop_(chunk, idx)), Tp.tuple(A.empty(), 0));
    }
  })));
}

function make(pull) {
  return T.map_(T.bind_(T.bind_(T.do, "done", () => R.makeRef(false)), "cursor", () => R.makeRef(Tp.tuple(A.empty(), 0))), ({
    cursor,
    done
  }) => new BufferedPull(pull, done, cursor));
}
//# sourceMappingURL=index.js.map