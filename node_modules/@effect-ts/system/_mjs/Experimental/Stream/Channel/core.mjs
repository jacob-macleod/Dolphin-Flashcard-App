// ets_tracing: off
import "../../../Operator/index.mjs";
import * as Cause from "../../../Cause/index.mjs";
import { identity } from "../../../Function/index.mjs";
import * as P from "./_internal/primitives.mjs";
export { makeSingleProducerAsyncInput } from "./_internal/producer.mjs";
export * from "./_internal/primitives.mjs";
/**
 * Pipe the output of a channel into the input of another
 */

export function pipeTo_(left, right) {
  return new P.PipeTo(() => left, () => right);
}
/**
 * Pipe the output of a channel into the input of another
 *
 * @ets_data_first pipeTo_
 */

export function pipeTo(right) {
  return left => pipeTo_(left, right);
}
/**
 * Reads an input and continue exposing both full error cause and completion
 */

export function readWithCause(inp, halt, done) {
  return new P.Read(inp, new P.ContinuationK(done, halt));
}
/**
 * End a channel with the specified result
 */

export function endWith(result) {
  return new P.Done(result);
}
/**
 * End a channel with the specified result
 */

export function end(result) {
  return new P.Done(() => result);
}
/**
 * Halt a channel with the specified cause
 */

export function failCauseWith(result) {
  return new P.Halt(result);
}
/**
 * Halt a channel with the specified cause
 */

export function failCause(result) {
  return new P.Halt(() => result);
}
/**
 * Halt a channel with the specified error
 */

export function failWith(error) {
  return new P.Halt(() => Cause.fail(error()));
}
/**
 * Halt a channel with the specified error
 */

export function fail(error) {
  return new P.Halt(() => Cause.fail(error));
}
/**
 * Halt a channel with the specified exception
 */

export function die(defect) {
  return new P.Halt(() => Cause.die(defect));
}
/**
 * Halt a channel with the specified exception
 */

export function dieWith(defect) {
  return new P.Halt(() => Cause.die(defect()));
}
/**
 * Writes an output to the channel
 */

export function writeWith(out) {
  return new P.Emit(out);
}
/**
 * Writes an output to the channel
 */

export function write(out) {
  return new P.Emit(() => out);
}
/**
 * Returns a new channel with an attached finalizer. The finalizer is guaranteed to be executed
 * so long as the channel begins execution (and regardless of whether or not it completes).
 */

export function ensuringWith_(channel, finalizer) {
  return new P.Ensuring(channel, finalizer);
}
/**
 * Returns a new channel with an attached finalizer. The finalizer is guaranteed to be executed
 * so long as the channel begins execution (and regardless of whether or not it completes).
 *
 * @ets_data_first ensuringWith_
 */

export function ensuringWith(finalizer) {
  return channel => ensuringWith_(channel, finalizer);
}
/**
 * Returns a new channel whose outputs are fed to the specified factory function, which creates
 * new channels in response. These new channels are sequentially concatenated together, and all
 * their outputs appear as outputs of the newly returned channel. The provided merging function
 * is used to merge the terminal values of all channels into the single terminal value of the
 * returned channel.
 */

export function concatMapWith_(self, f, g, h) {
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

export function concatMapWith(f, g, h) {
  return self => concatMapWith_(self, f, g, h);
}
/**
 * Concat sequentially a channel of channels
 */

export function concatAllWith_(channels, f, g) {
  return new P.ConcatAll(f, g, channels, identity);
}
/**
 * Concat sequentially a channel of channels
 *
 * @ets_data_first concatAllWith_
 */

export function concatAllWith(f, g) {
  return channels => concatAllWith_(channels, f, g);
}
/**
 * Fold the channel exposing success and full error cause
 */

export function foldCauseChannel_(self, onErr, onSucc) {
  return new P.Fold(self, new P.ContinuationK(onSucc, onErr));
}
/**
 * Fold the channel exposing success and full error cause
 *
 * @ets_data_first foldCauseChannel_
 */

export function foldCauseChannel(onErr, onSucc) {
  return self => foldCauseChannel_(self, onErr, onSucc);
}
/**
 * Embed inputs from continuos pulling of a producer
 */

export function embedInput_(self, input) {
  return new P.Bridge(input, self);
}
/**
 * Embed inputs from continuos pulling of a producer
 *
 * @ets_data_first embedInput_
 */

export function embedInput(input) {
  return self => embedInput_(self, input);
}
/**
 * Construct a resource Channel with Acquire / Release
 */

export function acquireReleaseOutExitWith_(self, release) {
  return new P.BracketOut(self, release);
}
/**
 * Construct a resource Channel with Acquire / Release
 *
 * @ets_data_first acquireReleaseOutExitWith_
 */

export function acquireReleaseOutExitWith(release) {
  return self => acquireReleaseOutExitWith_(self, release);
}
/**
 * Provides the channel with its required environment, which eliminates
 * its dependency on `Env`.
 */

export function provideAll_(self, env) {
  return new P.Provide(env, self);
}
/**
 * Provides the channel with its required environment, which eliminates
 * its dependency on `Env`.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(env) {
  return self => provideAll_(self, env);
}
/**
 * Returns a new channel, which sequentially combines this channel, together with the provided
 * factory function, which creates a second channel based on the terminal value of this channel.
 * The result is a channel that will first perform the functions of this channel, before
 * performing the functions of the created channel (including yielding its terminal value).
 */

export function chain_(self, f) {
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

export function chain(f) {
  return self => chain_(self, f);
}
export function suspend(effect) {
  return new P.EffectSuspendTotal(effect);
}
/**
 * Use an effect to end a channel
 */

export function fromEffect(self) {
  return new P.Effect(self);
}
export function succeedWith(effect) {
  return new P.EffectTotal(effect);
}
export function readOrFail(e) {
  return new P.Read(in_ => end(in_), new P.ContinuationK(_ => fail(e), _ => fail(e)));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 */

export function catchAllCause_(self, f) {
  return new P.Fold(self, new P.ContinuationK(_ => end(_), f));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 *
 * @ets_data_first catchAllCause_
 */

export function catchAllCause(f) {
  return self => catchAllCause_(self, f);
}
//# sourceMappingURL=core.mjs.map