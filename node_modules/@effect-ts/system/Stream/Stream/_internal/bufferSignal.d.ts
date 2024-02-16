import type * as A from "../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../Option/index.js";
import * as P from "../../../Promise/index.js";
import * as Q from "../../../Queue/index.js";
import * as T from "../../_internal/effect.js";
import * as M from "../../_internal/managed.js";
import * as Take from "../../Take/index.js";
import type { Stream } from "../definitions.js";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * to the provided queue.
 */
export declare function bufferSignal<R, E, O>(self: Stream<R, E, O>, queue: Q.Queue<Tp.Tuple<[Take.Take<E, O>, P.Promise<never, void>]>>): M.Managed<R, never, T.Effect<R, O.Option<E>, A.Chunk<O>>>;
//# sourceMappingURL=bufferSignal.d.ts.map