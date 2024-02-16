import "../../../../Operator/index.js";
import * as T from "../../../../Effect/index.js";
import * as Either from "../../../../Either/index.js";
import * as Exit from "../../../../Exit/index.js";
import * as P from "./primitives.js";
declare type ErasedExecutor<Env> = ChannelExecutor<Env, unknown, unknown, unknown, unknown, unknown, unknown>;
declare type ErasedChannel<R> = P.Channel<R, unknown, unknown, unknown, unknown, unknown, unknown>;
export declare type SubexecutorStack<R> = FromKAnd<R> | Inner<R>;
export declare const FromKAndTypeId: unique symbol;
export declare type FromKAndTypeId = typeof FromKAndTypeId;
export declare class FromKAnd<R> {
    readonly fromK: ErasedExecutor<R>;
    readonly rest: Inner<R>;
    readonly _typeId: FromKAndTypeId;
    constructor(fromK: ErasedExecutor<R>, rest: Inner<R>);
}
export declare const InnerTypeId: unique symbol;
export declare type InnerTypeId = typeof InnerTypeId;
export declare class Inner<R> {
    readonly exec: ErasedExecutor<R>;
    readonly subK: (u: unknown) => ErasedChannel<R>;
    readonly lastDone: unknown;
    readonly combineSubK: (a: unknown, b: unknown) => unknown;
    readonly combineSubKAndInner: (a: unknown, b: unknown) => unknown;
    readonly _typeId: InnerTypeId;
    constructor(exec: ErasedExecutor<R>, subK: (u: unknown) => ErasedChannel<R>, lastDone: unknown, combineSubK: (a: unknown, b: unknown) => unknown, combineSubKAndInner: (a: unknown, b: unknown) => unknown);
    close(ex: Exit.Exit<unknown, unknown>): T.RIO<R, Exit.Exit<unknown, unknown>> | undefined;
}
export declare const ChannelStateDoneTypeId: unique symbol;
export declare type ChannelStateDoneTypeId = typeof ChannelStateDoneTypeId;
export declare class ChannelStateDone {
    readonly _typeId: ChannelStateDoneTypeId;
}
export declare const ChannelStateEmitTypeId: unique symbol;
export declare type ChannelStateEmitTypeId = typeof ChannelStateEmitTypeId;
export declare class ChannelStateEmit {
    readonly _typeId: ChannelStateEmitTypeId;
}
export declare const ChannelStateEffectTypeId: unique symbol;
export declare type ChannelStateEffectTypeId = typeof ChannelStateEffectTypeId;
export declare class ChannelStateEffect<R, E> {
    readonly effect: T.Effect<R, E, unknown>;
    readonly _typeId: ChannelStateEffectTypeId;
    constructor(effect: T.Effect<R, E, unknown>);
}
export declare type ChannelState<R, E> = ChannelStateDone | ChannelStateEmit | ChannelStateEffect<R, E>;
export declare function channelStateEffect<R, E>(state: ChannelState<R, E> | undefined): T.Effect<R, E, unknown>;
export declare function channelStateUnroll<R, E>(runStep: () => ChannelState<R, E>): T.Effect<R, E, Either.Either<ChannelStateEmit, ChannelStateDone>>;
export declare function maybeCloseBoth<Env>(l: T.Effect<Env, never, unknown> | undefined, r: T.Effect<Env, never, unknown> | undefined): T.RIO<Env, Exit.Exit<never, unknown>> | undefined;
export declare class ChannelExecutor<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone> {
    private providedEnv;
    private executeCloseLastSubstream;
    private input?;
    private inProgressFinalizer?;
    private subexecutorStack?;
    private doneStack;
    private done?;
    private cancelled?;
    private emitted?;
    private currentChannel?;
    private closeLastSubstream?;
    constructor(initialChannel: () => P.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, providedEnv: unknown, executeCloseLastSubstream: (io: T.Effect<Env, never, unknown>) => T.Effect<Env, never, unknown>);
    private restorePipe;
    private unwindAllFinalizers;
    private popAllFinalizers;
    private popNextFinalizersGo;
    private popNextFinalizers;
    private storeInProgressFinalizer;
    private clearInProgressFinalizer;
    private ifNotNull;
    close(ex: Exit.Exit<unknown, unknown>): T.Effect<Env, never, unknown> | undefined;
    getDone(): Exit.Exit<OutErr, OutDone>;
    getEmit(): OutElem;
    cancelWith(exit: Exit.Exit<OutErr, OutDone>): void;
    run(): ChannelState<Env, OutErr>;
    private runReadGo;
    private runRead;
    private runBracketOut;
    private addFinalizer;
    private drainSubexecutor;
    private handleSubexecFailure;
    private drainFromKAndSubexecutor;
    private replaceSubexecutor;
    private finishSubexecutorWithCloseEffect;
    private doneSucceed;
    private runFinalizers;
    private doneHalt;
    private drainInnerSubExecutor;
    private processCancellation;
}
export {};
//# sourceMappingURL=executor.d.ts.map