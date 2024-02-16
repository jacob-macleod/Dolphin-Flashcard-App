import type * as C from "../../../Cause/index.js";
import * as A from "../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../Effect/index.js";
import * as O from "../../../Option/index.js";
import * as P from "../../../Promise/index.js";
import * as Ref from "../../../Ref/index.js";
import type * as SER from "./SinkEndReason.js";
export declare class Handoff<A> {
    readonly ref: Ref.Ref<State<A>>;
    constructor(ref: Ref.Ref<State<A>>);
}
export declare function make<A>(): T.Effect<unknown, never, Handoff<A>>;
export declare const StateTypeId: unique symbol;
export declare const EmptyTypeId: unique symbol;
export declare class Empty {
    readonly notifyConsumer: P.Promise<never, void>;
    readonly _stateTypeId: typeof StateTypeId;
    readonly _typeId: typeof EmptyTypeId;
    constructor(notifyConsumer: P.Promise<never, void>);
}
export declare const FullTypeId: unique symbol;
export declare class Full<A> {
    readonly a: A;
    readonly notifyConsumer: P.Promise<never, void>;
    readonly _stateTypeId: typeof StateTypeId;
    readonly _typeId: typeof FullTypeId;
    constructor(a: A, notifyConsumer: P.Promise<never, void>);
}
export declare type State<A> = Empty | Full<A>;
export declare function offer<A>(handoff: Handoff<A>, a: A): T.UIO<void>;
export declare function take<A>(handoff: Handoff<A>): T.UIO<A>;
export declare function poll<A>(handoff: Handoff<A>): T.UIO<O.Option<A>>;
export declare const HandoffSignalTypeId: unique symbol;
export declare const EmitTypeId: unique symbol;
export declare class Emit<A> {
    readonly els: A.Chunk<A>;
    readonly _handoffSignalTypeId: typeof HandoffSignalTypeId;
    readonly _typeId: typeof EmitTypeId;
    constructor(els: A.Chunk<A>);
}
export declare const HaltTypeId: unique symbol;
export declare class Halt<E> {
    readonly error: C.Cause<E>;
    readonly _handoffSignalTypeId: typeof HandoffSignalTypeId;
    readonly _typeId: typeof HaltTypeId;
    constructor(error: C.Cause<E>);
}
export declare const EndTypeId: unique symbol;
export declare class End<C> {
    readonly reason: SER.SinkEndReason<C>;
    readonly _handoffSignalTypeId: typeof HandoffSignalTypeId;
    readonly _typeId: typeof EndTypeId;
    constructor(reason: SER.SinkEndReason<C>);
}
export declare type HandoffSignal<C, E, A> = Emit<A> | Halt<E> | End<C>;
//# sourceMappingURL=Handoff.d.ts.map