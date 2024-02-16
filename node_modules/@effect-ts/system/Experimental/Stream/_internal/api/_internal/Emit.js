"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toEmit = toEmit;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Exit/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function toEmit(fn) {
  const ops = {
    chunk(as) {
      return this(T.succeed(as));
    },

    die(err) {
      return this(T.die(err));
    },

    dieMessage(message) {
      return this(T.dieMessage(message));
    },

    done(exit) {
      return this(T.done(Ex.mapBoth_(exit, e => O.some(e), a => CK.single(a))));
    },

    end() {
      return this(T.fail(O.none));
    },

    fail(e) {
      return this(T.fail(O.some(e)));
    },

    fromEffect(io) {
      return this(T.mapBoth_(io, e => O.some(e), a => CK.single(a)));
    },

    fromEffectChunk(io) {
      return this(T.mapError_(io, e => O.some(e)));
    },

    halt(cause) {
      return this(T.halt(CS.map_(cause, e => O.some(e))));
    },

    single(a) {
      return this(T.succeed(CK.single(a)));
    }

  };
  return Object.assign(fn, ops);
}
//# sourceMappingURL=Emit.js.map