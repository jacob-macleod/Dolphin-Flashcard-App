"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.debounce_ = debounce_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Clock/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Scope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Scope/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function debounce_(self, d) {
  class NotStarted {
    constructor() {
      this._tag = "NotStarted";
    }

  }

  class Previous {
    constructor(fiber) {
      this.fiber = fiber;
      this._tag = "Previous";
    }

  }

  class Current {
    constructor(fiber) {
      this.fiber = fiber;
      this._tag = "Current";
    }

  }

  class Done {
    constructor() {
      this._tag = "Done";
    }

  }

  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "ref", () => T.toManagedRelease_(Ref.makeRef(new NotStarted()), _ => T.chain_(_.get, state => {
    switch (state._tag) {
      case "Previous":
        return F.interrupt(state.fiber);

      case "Current":
        return F.interrupt(state.fiber);

      default:
        return T.unit;
    }
  }))), "pull", ({
    chunks,
    ref
  }) => {
    const store = chunk => T.as_(O.getOrElse_(O.map_(A.last(chunk), last => T.chain_(T.forkDaemon(T.as_(CL.sleep(d), last)), f => ref.set(new Previous(f)))), () => ref.set(new NotStarted())), A.empty());

    return T.chain_(ref.get, state => {
      switch (state._tag) {
        case "Previous":
          return T.transplant(graft => T.raceWithScope_(F.join(state.fiber), graft(chunks), (ex, current) => {
            if (Ex.succeeded(ex)) {
              return T.as_(ref.set(new Current(current)), A.single(ex.value));
            } else {
              return T.zipRight_(F.interrupt(current), Pull.halt(ex.cause));
            }
          }, (ex, previous) => {
            if (Ex.succeeded(ex)) {
              const chunk = ex.value;

              if (A.isEmpty(chunk)) {
                return Pull.empty();
              } else {
                return T.zipRight_(F.interrupt(previous), store(chunk));
              }
            } else {
              return O.fold_(C.sequenceCauseOption(ex.cause), () => T.zipLeft_(T.map_(F.join(previous), A.single), ref.set(new Done())), e => T.zipRight_(F.interrupt(previous), Pull.halt(e)));
            }
          }, Scope.globalScope));

        case "Current":
          return T.chain_(F.join(state.fiber), store);

        case "NotStarted":
          return T.chain_(chunks, store);

        case "Done":
          return Pull.end;
      }
    });
  }), ({
    pull
  }) => pull));
}

function debounce(d) {
  return self => debounce_(self, d);
}
//# sourceMappingURL=debounce.js.map