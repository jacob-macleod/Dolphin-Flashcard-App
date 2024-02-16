import * as CL from "../Clock/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as T from "../Effect/index.js";
import type * as Ex from "../Exit/index.js";
import * as Ref from "../Ref/index.js";
export declare abstract class StrategyBase<State, Environment, Error, Item> {
    readonly _State: State;
    readonly [T._R]: (_: Environment) => void;
    readonly [T._E]: (_: Error) => void;
    readonly [T._A]: (_: Item) => void;
    abstract initial(): T.RIO<Environment, State>;
    abstract track(state: State): (item: Ex.Exit<Error, Item>) => T.UIO<void>;
    abstract run(state: State, getExcess: T.UIO<number>, shrink: T.UIO<void>): T.UIO<void>;
}
export declare type Strategy<Environment, Error, Item> = StrategyBase<unknown, Environment, Error, Item>;
declare type StrategyState<T extends StrategyBase<any, any, any, any>> = T["_State"];
/**
 * A strategy that does nothing to shrink excess items. This is useful
 * when the minimum size of the pool is equal to its maximum size and so
 * there is nothing to do.
 */
export declare class None extends StrategyBase<void, unknown, unknown, unknown> {
    initial(): T.RIO<unknown, void>;
    track(_state: StrategyState<this>): (attempted: Ex.Exit<unknown, unknown>) => T.UIO<void>;
    run(_state: StrategyState<this>, _getExcess: T.UIO<number>, _shrink: T.UIO<unknown>): T.UIO<void>;
}
/**
 * A strategy that shrinks the pool down to its minimum size if items in
 * the pool have not been used for the specified duration.
 */
export declare class TimeToLive extends StrategyBase<Tp.Tuple<[CL.Clock, Ref.Ref<number>]>, CL.HasClock, unknown, unknown> {
    readonly timeToLive: number;
    constructor(timeToLive: number);
    initial(): T.RIO<CL.HasClock, StrategyState<this>>;
    track(state: StrategyState<this>): (attempted: Ex.Exit<unknown, unknown>) => T.UIO<void>;
    run(state: StrategyState<this>, getExcess: T.UIO<number>, shrink: T.UIO<unknown>): T.UIO<void>;
}
export {};
//# sourceMappingURL=Strategy.d.ts.map