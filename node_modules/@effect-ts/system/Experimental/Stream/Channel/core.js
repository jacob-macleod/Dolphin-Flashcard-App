"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  pipeTo_: true,
  pipeTo: true,
  readWithCause: true,
  endWith: true,
  end: true,
  failCauseWith: true,
  failCause: true,
  failWith: true,
  fail: true,
  die: true,
  dieWith: true,
  writeWith: true,
  write: true,
  ensuringWith_: true,
  ensuringWith: true,
  concatMapWith_: true,
  concatMapWith: true,
  concatAllWith_: true,
  concatAllWith: true,
  foldCauseChannel_: true,
  foldCauseChannel: true,
  embedInput_: true,
  embedInput: true,
  acquireReleaseOutExitWith_: true,
  acquireReleaseOutExitWith: true,
  provideAll_: true,
  provideAll: true,
  chain_: true,
  chain: true,
  suspend: true,
  fromEffect: true,
  succeedWith: true,
  readOrFail: true,
  catchAllCause_: true,
  catchAllCause: true,
  makeSingleProducerAsyncInput: true
};
exports.acquireReleaseOutExitWith = acquireReleaseOutExitWith;
exports.acquireReleaseOutExitWith_ = acquireReleaseOutExitWith_;
exports.catchAllCause = catchAllCause;
exports.catchAllCause_ = catchAllCause_;
exports.chain = chain;
exports.chain_ = chain_;
exports.concatAllWith = concatAllWith;
exports.concatAllWith_ = concatAllWith_;
exports.concatMapWith = concatMapWith;
exports.concatMapWith_ = concatMapWith_;
exports.die = die;
exports.dieWith = dieWith;
exports.embedInput = embedInput;
exports.embedInput_ = embedInput_;
exports.end = end;
exports.endWith = endWith;
exports.ensuringWith = ensuringWith;
exports.ensuringWith_ = ensuringWith_;
exports.fail = fail;
exports.failCause = failCause;
exports.failCauseWith = failCauseWith;
exports.failWith = failWith;
exports.foldCauseChannel = foldCauseChannel;
exports.foldCauseChannel_ = foldCauseChannel_;
exports.fromEffect = fromEffect;
Object.defineProperty(exports, "makeSingleProducerAsyncInput", {
  enumerable: true,
  get: function () {
    return _producer.makeSingleProducerAsyncInput;
  }
});
exports.pipeTo = pipeTo;
exports.pipeTo_ = pipeTo_;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.readOrFail = readOrFail;
exports.readWithCause = readWithCause;
exports.succeedWith = succeedWith;
exports.suspend = suspend;
exports.write = write;
exports.writeWith = writeWith;

require("../../../Operator/index.js");

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Cause/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/primitives.js"));

Object.keys(P).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === P[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return P[key];
    }
  });
});

var _producer = /*#__PURE__*/require("./_internal/producer.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Pipe the output of a channel into the input of another
 */
function pipeTo_(left, right) {
  return new P.PipeTo(() => left, () => right);
}
/**
 * Pipe the output of a channel into the input of another
 *
 * @ets_data_first pipeTo_
 */


function pipeTo(right) {
  return left => pipeTo_(left, right);
}
/**
 * Reads an input and continue exposing both full error cause and completion
 */


function readWithCause(inp, halt, done) {
  return new P.Read(inp, new P.ContinuationK(done, halt));
}
/**
 * End a channel with the specified result
 */


function endWith(result) {
  return new P.Done(result);
}
/**
 * End a channel with the specified result
 */


function end(result) {
  return new P.Done(() => result);
}
/**
 * Halt a channel with the specified cause
 */


function failCauseWith(result) {
  return new P.Halt(result);
}
/**
 * Halt a channel with the specified cause
 */


function failCause(result) {
  return new P.Halt(() => result);
}
/**
 * Halt a channel with the specified error
 */


function failWith(error) {
  return new P.Halt(() => Cause.fail(error()));
}
/**
 * Halt a channel with the specified error
 */


function fail(error) {
  return new P.Halt(() => Cause.fail(error));
}
/**
 * Halt a channel with the specified exception
 */


function die(defect) {
  return new P.Halt(() => Cause.die(defect));
}
/**
 * Halt a channel with the specified exception
 */


function dieWith(defect) {
  return new P.Halt(() => Cause.die(defect()));
}
/**
 * Writes an output to the channel
 */


function writeWith(out) {
  return new P.Emit(out);
}
/**
 * Writes an output to the channel
 */


function write(out) {
  return new P.Emit(() => out);
}
/**
 * Returns a new channel with an attached finalizer. The finalizer is guaranteed to be executed
 * so long as the channel begins execution (and regardless of whether or not it completes).
 */


function ensuringWith_(channel, finalizer) {
  return new P.Ensuring(channel, finalizer);
}
/**
 * Returns a new channel with an attached finalizer. The finalizer is guaranteed to be executed
 * so long as the channel begins execution (and regardless of whether or not it completes).
 *
 * @ets_data_first ensuringWith_
 */


function ensuringWith(finalizer) {
  return channel => ensuringWith_(channel, finalizer);
}
/**
 * Returns a new channel whose outputs are fed to the specified factory function, which creates
 * new channels in response. These new channels are sequentially concatenated together, and all
 * their outputs appear as outputs of the newly returned channel. The provided merging function
 * is used to merge the terminal values of all channels into the single terminal value of the
 * returned channel.
 */


function concatMapWith_(self, f, g, h) {
  return new P.ConcatAll(g, h, self, f);
}
/**
 * Returns a new channel whose outputs are fed to the specified factory function, which creates
 * new channels in response. These new channels are sequentially concatenated together, and all
 * their outputs appear as outputs of the newly returned channel. The provided merging function
 * is used to merge the terminal values of all channels into the single terminal value of the
 * returned channel.
 *
 * @ets_data_first concatMapWith_
 */


function concatMapWith(f, g, h) {
  return self => concatMapWith_(self, f, g, h);
}
/**
 * Concat sequentially a channel of channels
 */


function concatAllWith_(channels, f, g) {
  return new P.ConcatAll(f, g, channels, _index3.identity);
}
/**
 * Concat sequentially a channel of channels
 *
 * @ets_data_first concatAllWith_
 */


function concatAllWith(f, g) {
  return channels => concatAllWith_(channels, f, g);
}
/**
 * Fold the channel exposing success and full error cause
 */


function foldCauseChannel_(self, onErr, onSucc) {
  return new P.Fold(self, new P.ContinuationK(onSucc, onErr));
}
/**
 * Fold the channel exposing success and full error cause
 *
 * @ets_data_first foldCauseChannel_
 */


function foldCauseChannel(onErr, onSucc) {
  return self => foldCauseChannel_(self, onErr, onSucc);
}
/**
 * Embed inputs from continuos pulling of a producer
 */


function embedInput_(self, input) {
  return new P.Bridge(input, self);
}
/**
 * Embed inputs from continuos pulling of a producer
 *
 * @ets_data_first embedInput_
 */


function embedInput(input) {
  return self => embedInput_(self, input);
}
/**
 * Construct a resource Channel with Acquire / Release
 */


function acquireReleaseOutExitWith_(self, release) {
  return new P.BracketOut(self, release);
}
/**
 * Construct a resource Channel with Acquire / Release
 *
 * @ets_data_first acquireReleaseOutExitWith_
 */


function acquireReleaseOutExitWith(release) {
  return self => acquireReleaseOutExitWith_(self, release);
}
/**
 * Provides the channel with its required environment, which eliminates
 * its dependency on `Env`.
 */


function provideAll_(self, env) {
  return new P.Provide(env, self);
}
/**
 * Provides the channel with its required environment, which eliminates
 * its dependency on `Env`.
 *
 * @ets_data_first provideAll_
 */


function provideAll(env) {
  return self => provideAll_(self, env);
}
/**
 * Returns a new channel, which sequentially combines this channel, together with the provided
 * factory function, which creates a second channel based on the terminal value of this channel.
 * The result is a channel that will first perform the functions of this channel, before
 * performing the functions of the created channel (including yielding its terminal value).
 */


function chain_(self, f) {
  return new P.Fold(self, new P.ContinuationK(f, failCause));
}
/**
 * Returns a new channel, which sequentially combines this channel, together with the provided
 * factory function, which creates a second channel based on the terminal value of this channel.
 * The result is a channel that will first perform the functions of this channel, before
 * performing the functions of the created channel (including yielding its terminal value).
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => chain_(self, f);
}

function suspend(effect) {
  return new P.EffectSuspendTotal(effect);
}
/**
 * Use an effect to end a channel
 */


function fromEffect(self) {
  return new P.Effect(self);
}

function succeedWith(effect) {
  return new P.EffectTotal(effect);
}

function readOrFail(e) {
  return new P.Read(in_ => end(in_), new P.ContinuationK(_ => fail(e), _ => fail(e)));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 */


function catchAllCause_(self, f) {
  return new P.Fold(self, new P.ContinuationK(_ => end(_), f));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 *
 * @ets_data_first catchAllCause_
 */


function catchAllCause(f) {
  return self => catchAllCause_(self, f);
}
//# sourceMappingURL=core.js.map