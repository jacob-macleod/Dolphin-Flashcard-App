import * as Cause from "../Cause/core.js";
import * as Exit from "../Exit/api.js";
import * as FR from "../FiberRef/fiberRef.js";
import * as O from "../Option/index.js";
import * as Scope from "../Scope/index.js";
import * as St from "../Structural/index.js";
import * as Sup from "../Supervisor/index.js";
import { AtomicReference } from "../Support/AtomicReference/index.js";
import { RingBuffer } from "../Support/RingBuffer/index.js";
import * as T from "./_internal/effect.js";
import * as Fiber from "./core.js";
import type { Platform } from "./platform.js";
import type { Callback } from "./state.js";
import * as Status from "./status.js";
import type { TraceElement } from "./tracing.js";
import { Trace } from "./tracing.js";
export declare type FiberRefLocals = Map<FR.Runtime<any>, any>;
export declare class Stack<A> {
    readonly value: A;
    readonly previous?: Stack<A> | undefined;
    constructor(value: A, previous?: Stack<A> | undefined);
}
export declare class InterruptExit {
    readonly apply: (a: any) => T.Effect<any, any, any>;
    readonly trace?: string | undefined;
    readonly _tag = "InterruptExit";
    constructor(apply: (a: any) => T.Effect<any, any, any>, trace?: string | undefined);
}
export declare class TracingExit {
    readonly apply: (a: any) => T.Effect<any, any, any>;
    readonly trace?: string | undefined;
    readonly _tag = "TracingExit";
    constructor(apply: (a: any) => T.Effect<any, any, any>, trace?: string | undefined);
}
export declare class HandlerFrame {
    readonly apply: (a: any) => T.Effect<any, any, any>;
    readonly trace?: string | undefined;
    readonly _tag = "HandlerFrame";
    constructor(apply: (a: any) => T.Effect<any, any, any>, trace?: string | undefined);
}
export declare class ApplyFrame {
    readonly apply: (a: any) => T.Effect<any, any, any>;
    readonly trace?: string | undefined;
    readonly _tag = "ApplyFrame";
    constructor(apply: (a: any) => T.Effect<any, any, any>, trace?: string | undefined);
}
export declare type Frame = InterruptExit | TracingExit | T.IFold<any, any, any, any, any, any, any, any, any> | HandlerFrame | ApplyFrame;
export declare const currentFiber: AtomicReference<FiberContext<any, any> | null>;
export declare const unsafeCurrentFiber: () => O.Option<FiberContext<any, any>>;
export declare class FiberContext<E, A> implements Fiber.Runtime<E, A> {
    readonly fiberId: Fiber.FiberID;
    readonly startEnv: any;
    readonly startIStatus: Fiber.InterruptStatus;
    readonly fiberRefLocals: FiberRefLocals;
    readonly supervisor0: Sup.Supervisor<any>;
    readonly openScope: Scope.Open<Exit.Exit<E, A>>;
    readonly maxOp: number;
    readonly reportFailure: (e: Cause.Cause<E>) => void;
    readonly platform: Platform<unknown>;
    readonly parentTrace: O.Option<Trace>;
    readonly initialTracingStatus: boolean;
    readonly _tag = "RuntimeFiber";
    readonly state: AtomicReference<import("./state.js").FiberState<E, A>>;
    asyncEpoch: number;
    stack?: Stack<Frame> | undefined;
    environments?: Stack<any> | undefined;
    interruptStatus?: Stack<boolean> | undefined;
    supervisors: Stack<Sup.Supervisor<any>>;
    forkScopeOverride?: Stack<O.Option<Scope.Scope<Exit.Exit<any, any>>>> | undefined;
    scopeKey: Scope.Key | undefined;
    traceStatusEnabled: boolean;
    traceStatusStack: Stack<boolean> | undefined;
    executionTraces: RingBuffer<TraceElement> | undefined;
    stackTraces: RingBuffer<TraceElement> | undefined;
    constructor(fiberId: Fiber.FiberID, startEnv: any, startIStatus: Fiber.InterruptStatus, fiberRefLocals: FiberRefLocals, supervisor0: Sup.Supervisor<any>, openScope: Scope.Open<Exit.Exit<E, A>>, maxOp: number, reportFailure: (e: Cause.Cause<E>) => void, platform: Platform<unknown>, parentTrace: O.Option<Trace>, initialTracingStatus: boolean);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
    get poll(): T.UIO<O.None | O.Some<Exit.Exit<E, A>>>;
    addTrace(trace?: string): void;
    addTraceValue(trace: TraceElement): void;
    getRef<K>(fiberRef: FR.Runtime<K>): T.UIO<K>;
    poll0(): O.None | O.Some<Exit.Exit<E, A>>;
    interruptExit: InterruptExit;
    popTracingStatus(): void;
    pushTracingStatus(flag: boolean): void;
    tracingExit: TracingExit;
    get isInterruptible(): boolean;
    get isInterrupted(): boolean;
    get isInterrupting(): boolean;
    get shouldInterrupt(): boolean;
    get isStackEmpty(): boolean;
    get id(): Fiber.FiberID;
    pushContinuation(k: Frame): void;
    popStackTrace(): void;
    popContinuation(): Frame | undefined;
    pushEnv(k: any): void;
    popEnv(): any;
    pushInterruptStatus(flag: boolean): void;
    popInterruptStatus(): boolean | undefined;
    runAsync(k: Callback<E, A>): void;
    /**
     * Unwinds the stack, looking for the first error handler, and exiting
     * interruptible / uninterruptible regions.
     */
    unwindStack(): boolean;
    register0(k: Callback<never, Exit.Exit<E, A>>): Exit.Exit<E, A> | null;
    nextInstr(value: any): T.Instruction | undefined;
    notifyObservers(v: Exit.Exit<E, A>, observers: Callback<never, Exit.Exit<E, A>>[]): void;
    observe0(k: Callback<never, Exit.Exit<E, A>>): O.Option<T.UIO<Exit.Exit<E, A>>>;
    get await(): T.UIO<Exit.Exit<E, A>>;
    interruptObserver(k: Callback<never, Exit.Exit<E, A>>): void;
    interruptAs(fiberId: Fiber.FiberID): T.UIO<Exit.Exit<E, A>>;
    done(v: Exit.Exit<E, A>): T.Instruction | undefined;
    reportUnhandled(exit: Exit.Exit<E, A>): void;
    setInterrupting(value: boolean): void;
    enterAsync(epoch: number, blockingOn: readonly Fiber.FiberID[]): T.Instruction | undefined;
    exitAsync(epoch: number): boolean;
    resumeAsync(epoch: number): (_: T.Effect<any, any, any>) => void;
    evaluateLater(i0: T.Instruction): void;
    get scope(): Scope.Scope<Exit.Exit<E, A>>;
    get status(): T.UIO<Status.Status>;
    fork(i0: T.Instruction, forkScope: O.Option<Scope.Scope<Exit.Exit<any, any>>>, reportFailure: O.Option<(e: Cause.Cause<E>) => void>): FiberContext<any, any>;
    private parentScopeOp;
    onDone(k: Callback<never, Exit.Exit<E, A>>): void;
    getDescriptor(): Fiber.Descriptor;
    complete<R, R1, R2, E2, A2, R3, E3, A3>(winner: Fiber.Fiber<any, any>, loser: Fiber.Fiber<any, any>, cont: (exit: Exit.Exit<any, any>, fiber: Fiber.Fiber<any, any>) => T.Effect<any, any, any>, winnerExit: Exit.Exit<any, any>, ab: AtomicReference<boolean>, cb: (_: T.Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>) => void): void;
    get inheritRefs(): T.Effect<unknown, never, void>;
    get inTracingRegion(): boolean;
    raceWithImpl<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(race: T.IRaceWith<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>): T.Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>;
    captureTrace(): Trace;
    cutAncestryTrace(trace: Trace): Trace;
    evaluateNow(i0: T.Instruction): void;
}
//# sourceMappingURL=context.d.ts.map