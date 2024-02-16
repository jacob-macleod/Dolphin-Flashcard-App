import type * as C from "../../../Cause/index.js";
import * as A from "../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../Effect/index.js";
import * as O from "../../../Option/index.js";
import * as Q from "../../../Queue/index.js";
import * as Take from "../Take/index.js";
export declare type Pull<R, E, A> = T.Effect<R, O.Option<E>, A.Chunk<A>>;
export declare function emit<A>(a: A): T.UIO<A.Chunk<A>>;
export declare function emitChunk<A>(as: A.Chunk<A>): T.UIO<A.Chunk<A>>;
export declare function fromQueue<E, A>(d: Q.Dequeue<Take.Take<E, A>>): T.IO<O.Option<E>, A.Chunk<A>>;
export declare function fail<E>(e: E): T.IO<O.Option<E>, never>;
export declare function failCause<E>(c: C.Cause<E>): T.IO<O.Option<E>, never>;
export declare function empty<A>(): T.IO<never, A.Chunk<A>>;
export declare const end: T.IO<O.Option<never>, never>;
//# sourceMappingURL=index.d.ts.map