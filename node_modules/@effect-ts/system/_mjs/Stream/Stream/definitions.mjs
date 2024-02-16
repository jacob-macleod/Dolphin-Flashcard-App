// ets_tracing: off
import * as C from "../../Cause/core.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Exit from "../../Exit/api.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Finalizer from "../../Managed/ReleaseMap/finalizer.mjs";
import * as makeReleaseMap from "../../Managed/ReleaseMap/makeReleaseMap.mjs";
import * as releaseAll from "../../Managed/ReleaseMap/releaseAll.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
export const StreamURI = "@matechs/core/Eff/StreamURI";
/**
 * A `Stream<R, E, O>` is a description of a program that, when evaluated,
 * may emit 0 or more values of type `O`, may fail with errors of type `E`
 * and uses an environment of type `R` and can be sync or async `S`.
 * One way to think of `Stream` is as a `Effect` program that could emit multiple values.
 *
 * This data type can emit multiple `A` values through multiple calls to `next`.
 * Similarly, embedded inside every `Stream` is an Effect program: `Effect< R, Option<E>, A.Chunk<O>>`.
 * This program will be repeatedly evaluated as part of the stream execution. For
 * every evaluation, it will emit a chunk of values or end with an optional failure.
 * A failure of type `None` signals the end of the stream.
 *
 * `Stream` is a purely functional *pull* based stream. Pull based streams offer
 * inherent laziness and backpressure, relieving users of the need to manage buffers
 * between operators. As an optimization, `Stream` does not emit single values, but
 * rather an array of values. This allows the cost of effect evaluation to be
 * amortized.
 *
 * The last important attribute of `Stream` is resource management: it makes
 * heavy use of `Managed` to manage resources that are acquired
 * and released during the stream's lifetime.
 *
 * `Stream` forms a monad on its `O` type parameter, and has error management
 * facilities for its `E` type parameter, modeled similarly to `Effect` (with some
 * adjustments for the multiple-valued nature of `Stream`). These aspects allow
 * for rich and expressive composition of streams.
 *
 * The current encoding of `Stream` is *not* safe for recursion. `Stream` programs
 * that are defined in terms of themselves will leak memory.
 *
 * Instead, recursive operators must be defined explicitly. See the definition of
 * `forever` for an example. This limitation will be lifted in the future.
 */

export class Stream {
  constructor(proc) {
    this.proc = proc;
  }

}
T._U, T._E, T._A, T._R;
/**
 * The default chunk size used by the various combinators and constructors of `Stream`.
 */

export const DefaultChunkSize = 4096;
/**
 * @internal
 */

export class Chain {
  constructor(f0, outerStream, currOuterChunk, currInnerStream, innerFinalizer) {
    this.f0 = f0;
    this.outerStream = outerStream;
    this.currOuterChunk = currOuterChunk;
    this.currInnerStream = currInnerStream;
    this.innerFinalizer = innerFinalizer;
    this.apply = this.apply.bind(this);
    this.closeInner = this.closeInner.bind(this);
    this.pullNonEmpty = this.pullNonEmpty.bind(this);
    this.pullOuter = this.pullOuter.bind(this);
  }

  closeInner() {
    return T.chain_(Ref.getAndSet_(this.innerFinalizer, Finalizer.noopFinalizer), f => f(Exit.unit));
  }

  pullNonEmpty(pull) {
    return T.chain_(pull, os => !A.isEmpty(os) ? T.succeed(os) : this.pullNonEmpty(pull));
  }

  pullOuter() {
    return T.chain_(T.flatten(Ref.modify_(this.currOuterChunk, ({
      tuple: [chunk, nextIdx]
    }) => {
      if (nextIdx < A.size(chunk)) {
        return Tp.tuple(T.succeed(A.unsafeGet_(chunk, nextIdx)), Tp.tuple(chunk, nextIdx + 1));
      } else {
        return Tp.tuple(T.map_(T.tap_(this.pullNonEmpty(this.outerStream), os => this.currOuterChunk.set(Tp.tuple(os, 1))), os => A.unsafeGet_(os, 0)), Tp.tuple(chunk, nextIdx));
      }
    })), o => T.uninterruptibleMask(({
      restore
    }) => T.asUnit(T.tap_(T.tap_(T.bind_(T.bind_(T.do, "releaseMap", () => makeReleaseMap.makeReleaseMap), "pull", ({
      releaseMap
    }) => restore(T.map_(T.provideSome_(this.f0(o).proc.effect, _ => Tp.tuple(_, releaseMap)), _ => _.get(1)))), ({
      pull
    }) => this.currInnerStream.set(pull)), ({
      releaseMap
    }) => this.innerFinalizer.set(e => releaseAll.releaseAll(e, T.sequential)(releaseMap))))));
  }

  apply() {
    return T.catchAllCause_(T.flatten(this.currInnerStream.get), c => O.fold_(C.sequenceCauseOption(c), // The additional switch is needed to eagerly run the finalizer
    // *before* pulling another element from the outer stream.
    () => T.chain_(T.chain_(this.closeInner(), () => this.pullOuter()), () => new Chain(this.f0, this.outerStream, this.currOuterChunk, this.currInnerStream, this.innerFinalizer).apply()), Pull.halt));
  }

}
//# sourceMappingURL=definitions.mjs.map