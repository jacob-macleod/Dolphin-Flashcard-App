import "../../../../Operator/index.js";
import type * as Cause from "../../../../Cause/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as Exit from "../../../../Exit/index.js";
import type { AsyncInputProducer } from "./producer.js";
import { _Env, _InDone, _InElem, _InErr, _OutDone, _OutDone2, _OutElem, _OutErr, _OutErr2 } from "./symbols.js";
/**
 * A `Channel` is a nexus of I/O operations, which supports both reading and writing.
 * A channel may read values of type `InElem` and write values of type `OutElem`.
 * When the channel finishes, it yields a value of type `OutDone`. A channel may fail with
 * a value of type `OutErr`.
 *
 * Channels are the foundation of Streams: both streams and sinks are built on channels.
 * Most users shouldn't have to use channels directly, as streams and sinks are much more convenient
 * and cover all common use cases. However, when adding new stream and sink operators, or doing
 * something highly specialized, it may be useful to use channels directly.
 *
 * Channels compose in a variety of ways:
 *
 *  - Piping. One channel can be piped to another channel, assuming the input type of the second
 *    is the same as the output type of the first.
 *  - Sequencing. The terminal value of one channel can be used to create another channel, and
 *    both the first channel and the function that makes the second channel can be composed into a
 *    channel.
 *  - Concating. The output of one channel can be used to create other channels, which are all
 *    concatenated together. The first channel and the function that makes the other channels can
 *    be composed into a channel.
 */
export declare abstract class Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    readonly [_Env]: (_: Env) => void;
    readonly [_InErr]: (_: InErr) => void;
    readonly [_InElem]: (_: InElem) => void;
    readonly [_InDone]: (_: InDone) => void;
    readonly [_OutErr]: () => OutErr;
    readonly [_OutElem]: () => OutElem;
    readonly [_OutDone]: () => OutDone;
    readonly [">>>"]: <Env2, OutErr2, OutElem2, OutDone2>(that: Channel<Env2, OutErr, OutElem, OutDone, OutErr2, OutElem2, OutDone2>) => Channel<Env & Env2, InErr, InElem, InDone, OutErr2, OutElem2, OutDone2>;
}
export declare abstract class Continuation<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2> {
    readonly [_Env]: (_: Env) => void;
    readonly [_InErr]: (_: InErr) => void;
    readonly [_InElem]: (_: InElem) => void;
    readonly [_InDone]: (_: InDone) => void;
    readonly [_OutErr]: (_: OutErr) => OutErr;
    readonly [_OutDone]: (_: OutDone) => OutDone;
    readonly [_OutErr2]: () => OutErr2;
    readonly [_OutElem]: () => OutElem;
    readonly [_OutDone2]: () => OutDone2;
}
/**
 * @ets_optimize remove
 */
export declare function concreteContinuation<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>(_: Continuation<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>): asserts _ is ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2> | ContinuationFinalizer<Env, OutErr, OutDone>;
export declare const ContinuationKTypeId: unique symbol;
export declare type ContinuationKTypeId = typeof ContinuationKTypeId;
export declare class ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2> extends Continuation<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2> {
    readonly onSuccess: (o: OutDone) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>;
    readonly onHalt: (c: Cause.Cause<OutErr>) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>;
    readonly _typeId: ContinuationKTypeId;
    constructor(onSuccess: (o: OutDone) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>, onHalt: (c: Cause.Cause<OutErr>) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>);
    onExit(exit: Exit.Exit<OutErr, OutDone>): Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>;
}
export declare const ContinuationFinalizerTypeId: unique symbol;
export declare type ContinuationFinalizerTypeId = typeof ContinuationFinalizerTypeId;
export declare class ContinuationFinalizer<Env, OutErr, OutDone> extends Continuation<Env, unknown, unknown, unknown, OutErr, never, never, OutDone, never> {
    readonly finalizer: (e: Exit.Exit<OutErr, OutDone>) => T.RIO<Env, unknown>;
    readonly _typeId: ContinuationFinalizerTypeId;
    constructor(finalizer: (e: Exit.Exit<OutErr, OutDone>) => T.RIO<Env, unknown>);
}
/**
 * @ets_optimize remove
 */
export declare function concrete<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(_: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>): asserts _ is PipeTo<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, any, any, any> | Read<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, any, any> | Done<OutDone> | Halt<OutErr> | Effect<Env, OutErr, OutDone> | Emit<OutElem, OutDone> | ConcatAll<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, any, any, any> | Bridge<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> | Fold<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, any, any> | Provide<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> | BracketOut<Env, OutErr, OutElem, OutDone> | Ensuring<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> | EffectTotal<OutDone> | EffectSuspendTotal<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
export declare const PipeToTypeId: unique symbol;
export declare type PipeToTypeId = typeof PipeToTypeId;
export declare class PipeTo<Env, InErr, InElem, InDone, OutErr2, OutElem2, OutDone2, OutErr, OutElem, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr2, OutElem2, OutDone2> {
    readonly left: () => Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
    readonly right: () => Channel<Env, OutErr, OutElem, OutDone, OutErr2, OutElem2, OutDone2>;
    readonly _typeId: PipeToTypeId;
    constructor(left: () => Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, right: () => Channel<Env, OutErr, OutElem, OutDone, OutErr2, OutElem2, OutDone2>);
}
export declare const ReadTypeId: unique symbol;
export declare type ReadTypeId = typeof ReadTypeId;
export declare class Read<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2, OutErr, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2> {
    readonly more: (i: InElem) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>;
    readonly done: ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>;
    readonly _typeId: ReadTypeId;
    constructor(more: (i: InElem) => Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2>, done: ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>);
}
export declare const DoneTypeId: unique symbol;
export declare type DoneTypeId = typeof DoneTypeId;
export declare class Done<OutDone> extends Channel<unknown, unknown, unknown, unknown, never, never, OutDone> {
    readonly terminal: () => OutDone;
    readonly _typeId: DoneTypeId;
    constructor(terminal: () => OutDone);
}
export declare const HaltTypeId: unique symbol;
export declare type HaltTypeId = typeof HaltTypeId;
export declare class Halt<OutErr> extends Channel<unknown, unknown, unknown, unknown, OutErr, never, never> {
    readonly error: () => Cause.Cause<OutErr>;
    readonly _typeId: HaltTypeId;
    constructor(error: () => Cause.Cause<OutErr>);
}
export declare const EffectTypeId: unique symbol;
export declare type EffectTypeId = typeof EffectTypeId;
export declare class Effect<Env, OutErr, OutDone> extends Channel<Env, unknown, unknown, unknown, OutErr, never, OutDone> {
    readonly effect: T.Effect<Env, OutErr, OutDone>;
    readonly _typeId: EffectTypeId;
    constructor(effect: T.Effect<Env, OutErr, OutDone>);
}
export declare const EmitTypeId: unique symbol;
export declare type EmitTypeId = typeof EmitTypeId;
export declare class Emit<OutElem, OutDone> extends Channel<unknown, unknown, unknown, unknown, never, OutElem, OutDone> {
    readonly out: () => OutElem;
    readonly _typeId: EmitTypeId;
    constructor(out: () => OutElem);
}
export declare const EnsuringTypeId: unique symbol;
export declare type EnsuringTypeId = typeof EnsuringTypeId;
export declare class Ensuring<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    readonly channel: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
    readonly finalizer: (e: Exit.Exit<OutErr, OutDone>) => T.Effect<Env, never, unknown>;
    readonly _typeId: EnsuringTypeId;
    constructor(channel: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, finalizer: (e: Exit.Exit<OutErr, OutDone>) => T.Effect<Env, never, unknown>);
}
export declare const ConcatAllTypeId: unique symbol;
export declare type ConcatAllTypeId = typeof ConcatAllTypeId;
export declare class ConcatAll<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone3, OutElem, OutDone, OutDone2> extends Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone3> {
    readonly combineInners: (o: OutDone, o1: OutDone) => OutDone;
    readonly combineAll: (o: OutDone, o2: OutDone2) => OutDone3;
    readonly value: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>;
    readonly k: (o: OutElem) => Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>;
    readonly _typeId: ConcatAllTypeId;
    constructor(combineInners: (o: OutDone, o1: OutDone) => OutDone, combineAll: (o: OutDone, o2: OutDone2) => OutDone3, value: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone2>, k: (o: OutElem) => Channel<Env, InErr, InElem, InDone, OutErr, OutElem2, OutDone>);
}
export declare const FoldTypeId: unique symbol;
export declare type FoldTypeId = typeof FoldTypeId;
export declare class Fold<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2, OutErr, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone2> {
    readonly value: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
    readonly k: ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>;
    readonly _typeId: FoldTypeId;
    constructor(value: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, k: ContinuationK<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone, OutDone2>);
}
export declare const BridgeTypeId: unique symbol;
export declare type BridgeTypeId = typeof BridgeTypeId;
export declare class Bridge<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    readonly input: AsyncInputProducer<InErr, InElem, InDone>;
    readonly channel: Channel<Env, unknown, unknown, unknown, OutErr, OutElem, OutDone>;
    readonly _typeId: BridgeTypeId;
    constructor(input: AsyncInputProducer<InErr, InElem, InDone>, channel: Channel<Env, unknown, unknown, unknown, OutErr, OutElem, OutDone>);
}
export declare const BracketOutTypeId: unique symbol;
export declare type BracketOutTypeId = typeof BracketOutTypeId;
export declare class BracketOut<R, E, Z, OutDone> extends Channel<R, unknown, unknown, unknown, E, Z, OutDone> {
    readonly acquire: T.Effect<R, E, Z>;
    readonly finalizer: (z: Z, e: Exit.Exit<unknown, unknown>) => T.RIO<R, unknown>;
    readonly _typeId: BracketOutTypeId;
    constructor(acquire: T.Effect<R, E, Z>, finalizer: (z: Z, e: Exit.Exit<unknown, unknown>) => T.RIO<R, unknown>);
}
export declare const ProvideTypeId: unique symbol;
export declare type ProvideTypeId = typeof ProvideTypeId;
export declare class Provide<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> extends Channel<unknown, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    readonly env: Env;
    readonly channel: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
    readonly _typeId: ProvideTypeId;
    constructor(env: Env, channel: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>);
}
export declare const EffectTotalTypeId: unique symbol;
export declare type EffectTotalTypeId = typeof EffectTotalTypeId;
export declare class EffectTotal<OutDone> extends Channel<unknown, unknown, unknown, unknown, never, never, OutDone> {
    readonly effect: () => OutDone;
    readonly _typeId: EffectTotalTypeId;
    constructor(effect: () => OutDone);
}
export declare const EffectSuspendTotalTypeId: unique symbol;
export declare type EffectSuspendTotalTypeId = typeof EffectSuspendTotalTypeId;
export declare class EffectSuspendTotal<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> extends Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    readonly effect: () => Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>;
    readonly _typeId: EffectSuspendTotalTypeId;
    constructor(effect: () => Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>);
}
//# sourceMappingURL=primitives.d.ts.map