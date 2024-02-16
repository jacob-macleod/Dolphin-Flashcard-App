import * as A from "../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../Effect/index.js";
import * as O from "../../../Option/index.js";
import * as Ref from "../../../Ref/index.js";
export declare class BufferedPull<R, E, A> {
    readonly upstream: T.Effect<R, O.Option<E>, A.Chunk<A>>;
    readonly done: Ref.Ref<boolean>;
    readonly cursor: Ref.Ref<Tp.Tuple<[A.Chunk<A>, number]>>;
    constructor(upstream: T.Effect<R, O.Option<E>, A.Chunk<A>>, done: Ref.Ref<boolean>, cursor: Ref.Ref<Tp.Tuple<[A.Chunk<A>, number]>>);
}
export declare function make<R, E, A>(upstream: T.Effect<R, O.Option<E>, A.Chunk<A>>): T.Effect<unknown, never, BufferedPull<R, E, A>>;
export declare function ifNotDone_<R, R1, E, E1, A, A1>(self: BufferedPull<R, E, A>, fa: T.Effect<R1, O.Option<E1>, A1>): T.Effect<R1, O.Option<E1>, A1>;
/**
 * @ets_data_first ifNotDone_
 */
export declare function ifNotDone<R1, E1, A1>(fa: T.Effect<R1, O.Option<E1>, A1>): <R, E, A>(self: BufferedPull<R, E, A>) => T.Effect<R1, O.Option<E1>, A1>;
export declare function update<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, void>;
export declare function pullElement<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, A>;
export declare function pullChunk<R, E, A>(self: BufferedPull<R, E, A>): T.Effect<R, O.Option<E>, A.Chunk<A>>;
//# sourceMappingURL=BufferedPull.d.ts.map