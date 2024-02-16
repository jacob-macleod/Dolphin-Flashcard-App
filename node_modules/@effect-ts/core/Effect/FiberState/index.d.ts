import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Has, Tag } from "../../Has/index.js";
import * as T from "../index.js";
import * as L from "../Layer/index.js";
export interface FiberState<S> {
    readonly get: T.Effect<unknown, never, S>;
    readonly set: (s: S) => T.Effect<unknown, never, void>;
    readonly update: (f: (s: S) => S) => T.Effect<unknown, never, void>;
    readonly modify: <A>(f: (s: S) => Tp.Tuple<[A, S]>) => T.Effect<unknown, never, A>;
}
export interface FiberStateExternal<S> {
    readonly Tag: Tag<FiberState<S>>;
    readonly get: T.Effect<Has<FiberState<S>>, never, S>;
    readonly set: (s: S) => T.Effect<Has<FiberState<S>>, never, void>;
    readonly update: (f: (s: S) => S) => T.Effect<Has<FiberState<S>>, never, void>;
    readonly modify: <A>(f: (s: S) => Tp.Tuple<[A, S]>) => T.Effect<Has<FiberState<S>>, never, A>;
    readonly runState: (s: S) => <R, E, A>(self: T.Effect<Has<FiberState<S>> & R, E, A>) => T.Effect<R, E, A>;
    readonly Live: (s: S) => L.Layer<unknown, never, Has<FiberState<S>>>;
}
export declare function makeFiberState<S>(initial: S): T.Effect<unknown, never, FiberState<S>>;
export declare function FiberState<S>(S: PropertyKey): FiberStateExternal<S>;
//# sourceMappingURL=index.d.ts.map