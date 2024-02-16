import "../../Operator/index.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import * as R from "../_internal/ref.js";
export declare class BufferedPull<R, E, A> {
    readonly upstream: T.Effect<R, O.Option<E>, A.Chunk<A>>;
    readonly done: R.Ref<boolean>;
    readonly cursor: R.Ref<Tp.Tuple<[A.Chunk<A>, number]>>;
    constructor(upstream: T.Effect<R, O.Option<E>, A.Chunk<A>>, done: R.Ref<boolean>, cursor: R.Ref<Tp.Tuple<[A.Chunk<A>, number]>>);
}
export declare function ifNotDone_<R, R1, E, E1, A, A1>(self: BufferedPull<R, E, A>, fa: T.Effect<R1, O.Option<E1>, A1>): T.Effect<R1, O.Option<E1>, A1>;
export declare function ifNotDone<R1, E1, A1>(fa: T.Effect<R1, O.Option<E1>, A1>): <R, E, A>(self: BufferedPull<R, E, A>) => T.Effect<R1, O.Option<E1>, A1>;
export declare function update<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, void>;
export declare function pullElement<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, A>;
export declare function pullChunk<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, A.Chunk<A>>;
export declare function make<R, E, A>(pull: T.Effect<R, O.Option<E>, A.Chunk<A>>): T.Effect<unknown, never, BufferedPull<R, E, A>>;
//# sourceMappingURL=index.d.ts.map