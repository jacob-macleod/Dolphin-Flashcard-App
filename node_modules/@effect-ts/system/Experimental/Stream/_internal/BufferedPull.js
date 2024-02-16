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

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ref/index.js"));

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

function make(upstream) {
  return T.map_(T.bind_(T.bind_(T.do, "done", () => Ref.makeRef(false)), "cursor", () => Ref.makeRef(Tp.tuple(A.empty(), 0))), ({
    cursor,
    done
  }) => new BufferedPull(upstream, done, cursor));
}

function ifNotDone_(self, fa) {
  return T.chain_(Ref.get(self.done), _ => {
    if (_) {
      return Pull.end;
    } else {
      return fa;
    }
  });
}
/**
 * @ets_data_first ifNotDone_
 */


function ifNotDone(fa) {
  return self => ifNotDone_(self, fa);
}

function update(self) {
  return ifNotDone_(self, T.foldM_(self.upstream, O.fold(() => T.zipRight_(Ref.set_(self.done, true), Pull.end), e => Pull.fail(e)), chunk => Ref.set_(self.cursor, Tp.tuple(chunk, 0))));
}

function pullElement(self) {
  return ifNotDone_(self, T.flatten(Ref.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.zipRight_(update(self), pullElement(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.unsafeGet_(chunk, idx)), Tp.tuple(A.empty(), idx + 1));
    }
  })));
}

function pullChunk(self) {
  return ifNotDone_(self, T.flatten(Ref.modify_(self.cursor, ({
    tuple: [chunk, idx]
  }) => {
    if (idx >= A.size(chunk)) {
      return Tp.tuple(T.zipRight_(update(self), pullChunk(self)), Tp.tuple(A.empty(), 0));
    } else {
      return Tp.tuple(T.succeed(A.drop_(chunk, idx)), Tp.tuple(A.empty(), 0));
    }
  })));
}
//# sourceMappingURL=BufferedPull.js.map