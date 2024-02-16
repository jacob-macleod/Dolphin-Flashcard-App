import "../../Operator/index.js";
import type { Cause } from "../../Cause/core.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as O from "../../Option/index.js";
import * as Q from "../../Queue/index.js";
import * as T from "../_internal/effect.js";
import type { Take } from "../Take/index.js";
export declare type Pull<R, E, O> = T.Effect<R, O.Option<E>, A.Chunk<O>>;
export declare function emit<A>(a: A): Pull<unknown, never, A>;
export declare function emitChunk<A>(as: A.Chunk<A>): Pull<unknown, never, A>;
export declare function fromDequeue<E, A>(d: Q.Dequeue<Take<E, A>>): Pull<unknown, E, A>;
export declare function fail<E>(e: E): T.IO<O.Option<E>, never>;
export declare function halt<E>(e: Cause<E>): T.Effect<unknown, O.Option<E>, never>;
export declare function empty<A>(): Pull<unknown, never, A>;
export declare const end: T.IO<O.Option<never>, never>;
//# sourceMappingURL=index.d.ts.map