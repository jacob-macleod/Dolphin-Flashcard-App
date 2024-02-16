import type * as T from "../../../../Effect/index.js";
import type * as E from "../../../../Either/index.js";
import type * as Ex from "../../../../Exit/index.js";
import type * as F from "../../../../Fiber/index.js";
export declare const BothRunningTypeId: unique symbol;
export declare class BothRunning<_Env, Err, Err1, _Err2, Elem, Done, Done1, _Done2> {
    readonly left: F.Fiber<Err, E.Either<Done, Elem>>;
    readonly right: F.Fiber<Err1, E.Either<Done1, Elem>>;
    readonly _typeId: typeof BothRunningTypeId;
    constructor(left: F.Fiber<Err, E.Either<Done, Elem>>, right: F.Fiber<Err1, E.Either<Done1, Elem>>);
}
export declare const LeftDoneTypeId: unique symbol;
export declare class LeftDone<Env, _Err, Err1, Err2, _Elem, _Done, Done1, Done2> {
    readonly f: (ex: Ex.Exit<Err1, Done1>) => T.Effect<Env, Err2, Done2>;
    readonly _typeId: typeof LeftDoneTypeId;
    constructor(f: (ex: Ex.Exit<Err1, Done1>) => T.Effect<Env, Err2, Done2>);
}
export declare const RightDoneTypeId: unique symbol;
export declare class RightDone<Env, Err, _Err1, Err2, _Elem, Done, _Done1, Done2> {
    readonly f: (ex: Ex.Exit<Err, Done>) => T.Effect<Env, Err2, Done2>;
    readonly _typeId: typeof RightDoneTypeId;
    constructor(f: (ex: Ex.Exit<Err, Done>) => T.Effect<Env, Err2, Done2>);
}
export declare type MergeState<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> = BothRunning<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> | LeftDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2> | RightDone<Env, Err, Err1, Err2, Elem, Done, Done1, Done2>;
export declare const _R: "_R";
export declare const _E0: "_E0";
export declare const _Z0: "_Z0";
export declare const _E: "_E";
export declare const _Z: "_Z";
export declare const MergeDecisionTypeId: unique symbol;
export declare abstract class MergeDecision<R, E0, Z0, E, Z> {
    readonly _mergeDecisionTypeId: typeof MergeDecisionTypeId;
    readonly [_R]: (_: R) => void;
    readonly [_E0]: (_: E0) => void;
    readonly [_Z0]: (_: Z0) => void;
    readonly [_E]: () => E;
    readonly [_Z]: () => Z;
}
export declare function concrete<R, E0, Z0, E, Z>(decision: MergeDecision<R, E0, Z0, E, Z>): asserts decision is Done<R, E, Z> | Await<R, E0, Z0, E, Z>;
export declare const DoneTypeId: unique symbol;
export declare class Done<R, E, Z> extends MergeDecision<R, unknown, unknown, E, Z> {
    readonly io: T.Effect<R, E, Z>;
    readonly _typeId: typeof DoneTypeId;
    constructor(io: T.Effect<R, E, Z>);
}
export declare const AwaitTypeId: unique symbol;
export declare class Await<R, E0, Z0, E, Z> extends MergeDecision<R, E0, Z0, E, Z> {
    readonly f: (ex: Ex.Exit<E0, Z0>) => T.Effect<R, E, Z>;
    readonly _typeId: typeof AwaitTypeId;
    constructor(f: (ex: Ex.Exit<E0, Z0>) => T.Effect<R, E, Z>);
}
export declare function done<R, E, Z>(io: T.Effect<R, E, Z>): MergeDecision<R, unknown, unknown, E, Z>;
export declare function await_<R, E0, Z0, E, Z>(f: (ex: Ex.Exit<E0, Z0>) => T.Effect<R, E, Z>): MergeDecision<R, E0, Z0, E, Z>;
export declare function awaitConst<R, E, Z>(io: T.Effect<R, E, Z>): MergeDecision<R, unknown, unknown, E, Z>;
//# sourceMappingURL=mergeHelpers.d.ts.map