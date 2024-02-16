import * as CS from "../../../../../Cause/index.js";
import * as CK from "../../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../../Effect/index.js";
import * as Ex from "../../../../../Exit/index.js";
import * as O from "../../../../../Option/index.js";
export declare type Canceler<R> = T.RIO<R, unknown>;
export interface EmitOps<R, E, A, B> {
    chunk(as: CK.Chunk<A>): B;
    die<Err>(err: Err): B;
    dieMessage(message: string): B;
    done(exit: Ex.Exit<E, A>): B;
    end(): B;
    fail(e: E): B;
    fromEffect(io: T.Effect<R, E, A>): B;
    fromEffectChunk(io: T.Effect<R, E, CK.Chunk<A>>): B;
    halt(cause: CS.Cause<E>): B;
    single(a: A): B;
}
export interface Emit<R, E, A, B> extends EmitOps<R, E, A, B> {
    (f: T.Effect<R, O.Option<E>, CK.Chunk<A>>): B;
}
export declare function toEmit<R, E, A, B>(fn: (f: T.Effect<R, O.Option<E>, CK.Chunk<A>>) => B): Emit<R, E, A, B>;
//# sourceMappingURL=Emit.d.ts.map