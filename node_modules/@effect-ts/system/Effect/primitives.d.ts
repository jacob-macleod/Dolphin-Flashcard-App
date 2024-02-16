import type * as Cause from "../Cause/core.js";
import type { Tuple } from "../Collections/Immutable/Tuple/index.js";
import type * as Exit from "../Exit/exit.js";
import type { FiberContext } from "../Fiber/context.js";
import type * as Fiber from "../Fiber/core.js";
import type { FiberID } from "../Fiber/id.js";
import type { Platform } from "../Fiber/index.js";
import type { Trace } from "../Fiber/tracing.js";
import type { Runtime } from "../FiberRef/fiberRef.js";
import type * as O from "../Option/index.js";
import type { Scope } from "../Scope/index.js";
import type { Supervisor } from "../Supervisor/index.js";
import type { XPureBase } from "../XPure/core.js";
import type { Effect } from "./effect.js";
import { Base } from "./effect.js";
export declare type Instruction = IFlatMap<any, any, any, any, any, any> | ISucceed<any> | IEffectPartial<any, any> | IEffectTotal<any> | IEffectAsync<any, any, any> | IFold<any, any, any, any, any, any, any, any, any> | IFork<any, any, any> | IInterruptStatus<any, any, any> | ICheckInterrupt<any, any, any> | ICheckTracingStatus<any, any, any> | IFail<any> | IDescriptor<any, any, any> | IYield | ITrace | IRead<any, any, any, any> | IProvide<any, any, any> | ISuspend<any, any, any> | ISuspendPartial<any, any, any, any> | IFiberRefNew<any> | IFiberRefModify<any, any> | IRaceWith<any, any, any, any, any, any, any, any, any, any, any, any> | ISupervise<any, any, any> | IGetForkScope<any, any, any> | IOverrideForkScope<any, any, any> | ITracingStatus<any, any, any> | IPlatform<any, any, any> | ITracer<any, any, any> | XPureBase<unknown, unknown, unknown, any, any, any>;
export declare class IFail<E> extends Base<unknown, E, never> {
    readonly fill: (_: () => Trace) => Cause.Cause<E>;
    readonly trace?: string | undefined;
    readonly _tag = "Fail";
    constructor(fill: (_: () => Trace) => Cause.Cause<E>, trace?: string | undefined);
}
export declare class IFlatMap<R, E, A, R1, E1, A1> extends Base<R & R1, E | E1, A1> {
    readonly val: Effect<R, E, A>;
    readonly f: (a: A) => Effect<R1, E1, A1>;
    readonly trace?: string | undefined;
    readonly _tag = "FlatMap";
    constructor(val: Effect<R, E, A>, f: (a: A) => Effect<R1, E1, A1>, trace?: string | undefined);
}
export declare class ISucceed<A> extends Base<unknown, never, A> {
    readonly val: A;
    readonly trace?: string | undefined;
    readonly _tag = "Succeed";
    constructor(val: A, trace?: string | undefined);
}
export declare class ITrace extends Base<unknown, never, Trace> {
    readonly _tag = "Trace";
    constructor();
}
export declare class ITracingStatus<R, E, A> extends Base<R, E, A> {
    readonly effect: Effect<R, E, A>;
    readonly flag: boolean;
    readonly _tag = "TracingStatus";
    constructor(effect: Effect<R, E, A>, flag: boolean);
}
export declare class ICheckTracingStatus<R, E, A> extends Base<R, E, A> {
    readonly f: (tracingStatus: boolean) => Effect<R, E, A>;
    readonly _tag = "CheckTracingStatus";
    constructor(f: (tracingStatus: boolean) => Effect<R, E, A>);
}
export declare class IEffectPartial<E, A> extends Base<unknown, E, A> {
    readonly effect: () => A;
    readonly onThrow: (u: unknown) => E;
    readonly trace?: string | undefined;
    readonly _tag = "EffectPartial";
    constructor(effect: () => A, onThrow: (u: unknown) => E, trace?: string | undefined);
}
export declare class IEffectTotal<A> extends Base<unknown, never, A> {
    readonly effect: () => A;
    readonly trace?: string | undefined;
    readonly _tag = "EffectTotal";
    constructor(effect: () => A, trace?: string | undefined);
}
export declare class IEffectAsync<R, E, A> extends Base<R, E, A> {
    readonly register: (cb: (_: Effect<R, E, A>) => void) => O.Option<Effect<R, E, A>>;
    readonly blockingOn: readonly FiberID[];
    readonly trace?: string | undefined;
    readonly _tag = "EffectAsync";
    constructor(register: (cb: (_: Effect<R, E, A>) => void) => O.Option<Effect<R, E, A>>, blockingOn: readonly FiberID[], trace?: string | undefined);
}
export declare class IFold<R, E, A, R2, E2, A2, R3, E3, A3> extends Base<R & R2 & R3, E2 | E3, A2 | A3> {
    readonly value: Effect<R, E, A>;
    readonly failure: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>;
    readonly apply: (a: A) => Effect<R3, E3, A3>;
    readonly trace?: string | undefined;
    readonly _tag = "Fold";
    constructor(value: Effect<R, E, A>, failure: (cause: Cause.Cause<E>) => Effect<R2, E2, A2>, apply: (a: A) => Effect<R3, E3, A3>, trace?: string | undefined);
}
export declare type FailureReporter = (e: Cause.Cause<unknown>) => void;
export declare class IFork<R, E, A> extends Base<R, never, FiberContext<E, A>> {
    readonly value: Effect<R, E, A>;
    readonly scope: O.Option<Scope<Exit.Exit<any, any>>>;
    readonly reportFailure: O.Option<FailureReporter>;
    readonly trace?: string | undefined;
    readonly _tag = "Fork";
    constructor(value: Effect<R, E, A>, scope: O.Option<Scope<Exit.Exit<any, any>>>, reportFailure: O.Option<FailureReporter>, trace?: string | undefined);
}
export declare class IInterruptStatus<R, E, A> extends Base<R, E, A> {
    readonly effect: Effect<R, E, A>;
    readonly flag: Fiber.InterruptStatus;
    readonly trace?: string | undefined;
    readonly _tag = "InterruptStatus";
    constructor(effect: Effect<R, E, A>, flag: Fiber.InterruptStatus, trace?: string | undefined);
}
export declare class ICheckInterrupt<R, E, A> extends Base<R, E, A> {
    readonly f: (_: Fiber.InterruptStatus) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "CheckInterrupt";
    constructor(f: (_: Fiber.InterruptStatus) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class IDescriptor<R, E, A> extends Base<R, E, A> {
    readonly f: (_: Fiber.Descriptor) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Descriptor";
    constructor(f: (_: Fiber.Descriptor) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class IYield extends Base<unknown, never, void> {
    readonly _tag = "Yield";
    constructor();
}
export declare class IRead<R0, R, E, A> extends Base<R & R0, E, A> {
    readonly f: (_: R0) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Read";
    constructor(f: (_: R0) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class IPlatform<R, E, A> extends Base<R, E, A> {
    readonly f: (_: Platform<unknown>) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Platform";
    constructor(f: (_: Platform<unknown>) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class ITracer<R, E, A> extends Base<R, E, A> {
    readonly f: (tracer: (trace?: string) => void) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Tracer";
    constructor(f: (tracer: (trace?: string) => void) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class IProvide<R, E, A> extends Base<unknown, E, A> {
    readonly r: R;
    readonly next: Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Provide";
    constructor(r: R, next: Effect<R, E, A>, trace?: string | undefined);
}
export declare class ISuspend<R, E, A> extends Base<R, E, A> {
    readonly factory: (platform: Platform<unknown>, id: FiberID) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "Suspend";
    constructor(factory: (platform: Platform<unknown>, id: FiberID) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class ISuspendPartial<R, E, A, E2> extends Base<R, E | E2, A> {
    readonly factory: (platform: Platform<unknown>, id: FiberID) => Effect<R, E, A>;
    readonly onThrow: (u: unknown) => E2;
    readonly trace?: string | undefined;
    readonly _tag = "SuspendPartial";
    constructor(factory: (platform: Platform<unknown>, id: FiberID) => Effect<R, E, A>, onThrow: (u: unknown) => E2, trace?: string | undefined);
}
export declare class IFiberRefNew<A> extends Base<unknown, never, Runtime<A>> {
    readonly initial: A;
    readonly onFork: (a: A) => A;
    readonly onJoin: (a: A, a2: A) => A;
    readonly _tag = "FiberRefNew";
    constructor(initial: A, onFork: (a: A) => A, onJoin: (a: A, a2: A) => A);
}
export declare class IFiberRefModify<A, B> extends Base<unknown, never, B> {
    readonly fiberRef: Runtime<A>;
    readonly f: (a: A) => Tuple<[B, A]>;
    readonly trace?: string | undefined;
    readonly _tag = "FiberRefModify";
    constructor(fiberRef: Runtime<A>, f: (a: A) => Tuple<[B, A]>, trace?: string | undefined);
}
export declare class IRaceWith<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3> extends Base<R & R1 & R2 & R3, E2 | E3, A2 | A3> {
    readonly left: Effect<R, E, A>;
    readonly right: Effect<R1, E1, A1>;
    readonly leftWins: (exit: Exit.Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>;
    readonly rightWins: (exit: Exit.Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>;
    readonly scope: O.Option<Scope<Exit.Exit<any, any>>>;
    readonly trace?: string | undefined;
    readonly _tag = "RaceWith";
    constructor(left: Effect<R, E, A>, right: Effect<R1, E1, A1>, leftWins: (exit: Exit.Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>, rightWins: (exit: Exit.Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>, scope: O.Option<Scope<Exit.Exit<any, any>>>, trace?: string | undefined);
}
export declare class ISupervise<R, E, A> extends Base<R, E, A> {
    readonly effect: Effect<R, E, A>;
    readonly supervisor: Supervisor<any>;
    readonly trace?: string | undefined;
    readonly _tag = "Supervise";
    constructor(effect: Effect<R, E, A>, supervisor: Supervisor<any>, trace?: string | undefined);
}
export declare class IGetForkScope<R, E, A> extends Base<R, E, A> {
    readonly f: (_: Scope<Exit.Exit<any, any>>) => Effect<R, E, A>;
    readonly trace?: string | undefined;
    readonly _tag = "GetForkScope";
    constructor(f: (_: Scope<Exit.Exit<any, any>>) => Effect<R, E, A>, trace?: string | undefined);
}
export declare class IOverrideForkScope<R, E, A> extends Base<R, E, A> {
    readonly effect: Effect<R, E, A>;
    readonly forkScope: O.Option<Scope<Exit.Exit<any, any>>>;
    readonly trace?: string | undefined;
    readonly _tag = "OverrideForkScope";
    constructor(effect: Effect<R, E, A>, forkScope: O.Option<Scope<Exit.Exit<any, any>>>, trace?: string | undefined);
}
export * from "./effect.js";
//# sourceMappingURL=primitives.d.ts.map