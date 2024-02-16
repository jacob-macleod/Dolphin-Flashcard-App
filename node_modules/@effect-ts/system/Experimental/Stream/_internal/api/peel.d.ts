import type * as CS from "../../../../Cause/index.js";
import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as M from "../../../../Managed/index.js";
import * as SK from "../../Sink/index.js";
import * as C from "../core.js";
declare const SignalTypeId: unique symbol;
declare const EmitTypeId: unique symbol;
export declare class Emit<A> {
    readonly els: CK.Chunk<A>;
    readonly _signalTypeId: typeof SignalTypeId;
    readonly _typeId: typeof EmitTypeId;
    constructor(els: CK.Chunk<A>);
}
declare const HaltTypeId: unique symbol;
export declare class Halt<E> {
    readonly cause: CS.Cause<E>;
    readonly _signalTypeId: typeof SignalTypeId;
    readonly _typeId: typeof HaltTypeId;
    constructor(cause: CS.Cause<E>);
}
declare const EndTypeId: unique symbol;
export declare class End {
    readonly _signalTypeId: typeof SignalTypeId;
    readonly _typeId: typeof EndTypeId;
}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */
export declare function peel_<R, R1, E extends E1, E1, A extends A1, A1, Z>(self: C.Stream<R, E, A>, sink: SK.Sink<R1, E1, A1, E1, A1, Z>): M.Managed<R & R1, E | E1, Tp.Tuple<[Z, C.IO<E | E1, A1>]>>;
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 *
 * @ets_data_first peel_
 */
export declare function peel<R1, E extends E1, E1, A extends A1, A1, Z>(sink: SK.Sink<R1, E1, A1, E1, A1, Z>): <R>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E1 | E, Tp.Tuple<[Z, C.IO<E1 | E, A1>]>>;
export {};
//# sourceMappingURL=peel.d.ts.map