import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Has, Tag } from "../../Has/index.js";
import * as T from "../index.js";
import * as L from "../Layer/index.js";
export interface State<S> {
    readonly get: T.Effect<unknown, never, S>;
    readonly set: (s: S) => T.Effect<unknown, never, void>;
    readonly update: (f: (s: S) => S) => T.Effect<unknown, never, void>;
    readonly modify: <A>(f: (s: S) => Tp.Tuple<[A, S]>) => T.Effect<unknown, never, A>;
}
export interface StateExternal<S> {
    readonly Tag: Tag<State<S>>;
    readonly get: T.Effect<Has<State<S>>, never, S>;
    readonly set: (s: S) => T.Effect<Has<State<S>>, never, void>;
    readonly update: (f: (s: S) => S) => T.Effect<Has<State<S>>, never, void>;
    readonly modify: <A>(f: (s: S) => Tp.Tuple<[A, S]>) => T.Effect<Has<State<S>>, never, A>;
    readonly runState: (s: S) => <R, E, A>(self: T.Effect<Has<State<S>> & R, E, A>) => T.Effect<R, E, A>;
    readonly Live: (s: S) => L.Layer<unknown, never, Has<State<S>>>;
}
export declare function makeState<S>(initial: S): T.Effect<unknown, never, State<S>>;
export declare function State<S>(S: PropertyKey): StateExternal<S>;
//# sourceMappingURL=index.d.ts.map