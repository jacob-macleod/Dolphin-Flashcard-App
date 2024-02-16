var _a; // ets_tracing: off


import "../../../Operator/index.mjs";
import * as T from "../../../Effect/index.mjs";
export const StreamTypeId = /*#__PURE__*/Symbol();
/**
 * A `Stream<R, E, A>` is a description of a program that, when evaluated,
 * may emit 0 or more values of type `A`, may fail with errors of type `E`
 * and uses an environment of type `R`.
 * One way to think of `Stream` is as a `Effect` program that could emit multiple values.
 *
 * `Stream` is a purely functional *pull* based stream. Pull based streams offer
 * inherent laziness and backpressure, relieving users of the need to manage buffers
 * between operators. As an optimization, `Stream` does not emit single values, but
 * rather an array of values. This allows the cost of effect evaluation to be
 * amortized.
 *
 * `Stream` forms a monad on its `A` type parameter, and has error management
 * facilities for its `E` type parameter, modeled similarly to `Effect` (with some
 * adjustments for the multiple-valued nature of `Stream`). These aspects allow
 * for rich and expressive composition of streams.
 */

export class Stream {
  constructor(channel) {
    this.channel = channel;
    this[_a] = StreamTypeId;
  }

}
_a = StreamTypeId, T._R, T._E, T._A;
export function isStream(u) {
  return typeof u === "object" && u != null && StreamTypeId in u;
}
export const DEFAULT_CHUNK_SIZE = 4096;
//# sourceMappingURL=core.mjs.map