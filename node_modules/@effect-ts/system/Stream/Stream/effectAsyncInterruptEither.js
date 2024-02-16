"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectAsyncInterruptEither = effectAsyncInterruptEither;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback returns either a canceler or synchronously returns a stream.
 * The optionality of the error type `E` can be used to signal the end of the stream, by
 * setting it to `None`.
 */
function effectAsyncInterruptEither(register, outputBuffer = 16) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "output", () => T.toManaged(Q.makeBounded(outputBuffer))), "runtime", () => T.toManaged(T.runtime())), "eitherStream", ({
    output,
    runtime
  }) => M.succeedWith(() => register((k, cb) => (x => runtime.runCancel(x, cb))(T.chain_(Take.fromPull(k), x => Q.offer_(output, x)))))), "pull", ({
    eitherStream,
    output
  }) => E.fold_(eitherStream, canceler => M.ensuring_(M.map_(M.bind_(M.do, "done", () => Ref.makeManagedRef(false)), ({
    done
  }) => T.chain_(done.get, b => b ? Pull.end : T.onError_(T.chain_(Q.take(output), Take.done), () => T.chain_(done.set(true), () => Q.shutdown(output))))), canceler), s => M.chain_(T.toManaged(Q.shutdown(output)), () => s.proc))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=effectAsyncInterruptEither.js.map