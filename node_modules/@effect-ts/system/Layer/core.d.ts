import * as CL from "../Clock/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Has, Tag } from "../Has/index.js";
import type * as SC from "../Schedule/index.js";
import type { UnionToIntersection } from "../Utils/index.js";
import type { Layer, MergeA, MergeE, MergeR } from "./definitions.js";
import { LayerChain } from "./definitions.js";
import * as T from "./deps-effect.js";
import * as M from "./deps-managed.js";
export * from "./definitions.js";
/**
 * Lazily constructs a layer. This is useful to avoid infinite recursion when
 * creating layers that refer to themselves.
 */
export declare function suspend<RIn, E, ROut>(f: () => Layer<RIn, E, ROut>): Layer<RIn, E, ROut>;
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */
export declare function zipWithPar_<RIn, RIn1, E, E1, ROut, ROut1, ROut2>(self: Layer<RIn, E, ROut>, that: Layer<RIn1, E1, ROut1>, f: (a: ROut, b: ROut1) => ROut2): Layer<RIn & RIn1, E | E1, ROut2>;
/**
 * Constructs a layer that fails with the specified value.
 */
export declare function fail<E>(e: E): Layer<unknown, E, never>;
/**
 * Constructs a layer from the specified value.
 */
export declare function succeed<T>(resource: T): Layer<unknown, never, T>;
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */
export declare function zipWithPar<RIn1, E1, ROut, ROut1, ROut2>(that: Layer<RIn1, E1, ROut1>, f: (a: ROut, b: ROut1) => ROut2): <RIn, E>(self: Layer<RIn, E, ROut>) => Layer<RIn & RIn1, E1 | E, ROut2>;
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */
export declare function zipPar_<RIn, RIn1, E, E1, ROut, ROut1>(self: Layer<RIn, E, ROut>, that: Layer<RIn1, E1, ROut1>): Layer<RIn & RIn1, E | E1, Tp.Tuple<[ROut, ROut1]>>;
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */
export declare function zipPar<RIn, RIn1, E, E1, ROut, ROut1>(that: Layer<RIn1, E1, ROut1>): (self: Layer<RIn, E, ROut>) => Layer<RIn & RIn1, E | E1, Tp.Tuple<[ROut, ROut1]>>;
/**
 * Construct a service layer from a value
 */
export declare function fromValue<T>(has: Tag<T>): (resource: T) => Layer<unknown, never, Has<T>>;
/**
 * Constructs a layer from the specified effect.
 *
 * @ets_data_first fromEffect_
 */
export declare function fromEffect<T>(has: Tag<T>): <R, E>(resource: T.Effect<R, E, T>) => Layer<R, E, Has<T>>;
/**
 * Constructs a layer from the specified effect.
 */
export declare function fromEffect_<R, E, T>(resource: T.Effect<R, E, T>, has: Tag<T>): Layer<R, E, Has<T>>;
/**
 * Constructs a layer from a managed resource.
 */
export declare function fromManaged<T>(has: Tag<T>): <R, E>(resource: M.Managed<R, E, T>) => Layer<R, E, Has<T>>;
/**
 * Constructs a layer from a managed resource.
 */
export declare function fromManaged_<R, E, T>(resource: M.Managed<R, E, T>, has: Tag<T>): Layer<R, E, Has<T>>;
/**
 * Constructs a layer from the environment using the specified function.
 */
export declare function fromFunction<B>(tag: Tag<B>): <A>(f: (a: A) => B) => Layer<A, never, Has<B>>;
/**
 * Zips layers together
 */
export declare function zip_<R, E, A, R2, E2, A2>(self: Layer<R, E, A>, that: Layer<R2, E2, A2>): Layer<R & R2, E | E2, Tp.Tuple<[A, A2]>>;
/**
 * Zips layers together
 */
export declare function zip<R2, E2, A2>(right: Layer<R2, E2, A2>): <R, E, A>(left: Layer<R, E, A>) => Layer<R & R2, E2 | E, Tp.Tuple<[A, A2]>>;
/**
 * Merges layers sequentially
 */
export declare function andSeq<R2, E2, A2>(that: Layer<R2, E2, A2>): <R, E, A>(self: Layer<R, E, A>) => Layer<R & R2, E2 | E, A & A2>;
/**
 * Merges layers sequentially
 */
export declare function andSeq_<R, E, A, R2, E2, A2>(self: Layer<R, E, A>, that: Layer<R2, E2, A2>): Layer<R & R2, E | E2, A & A2>;
/**
 * Merges all layers in parallel
 */
export declare function all<Ls extends Layer<any, any, any>[]>(...ls: Ls & {
    0: Layer<any, any, any>;
}): Layer<MergeR<Ls>, MergeE<Ls>, MergeA<Ls>>;
/**
 * Merges all layers sequentially
 */
export declare function allSeq<Ls extends Layer<any, any, any>[]>(...ls: Ls & {
    0: Layer<any, any, any>;
}): Layer<MergeR<Ls>, MergeE<Ls>, MergeA<Ls>>;
/**
 * Type level bound to make sure a layer is complete
 */
export declare function main<E, A>(layer: Layer<T.DefaultEnv, E, A>): Layer<T.DefaultEnv, E, A>;
/**
 * Converts a layer to a managed runtime
 */
export declare function toRuntime<R, E, A>(_: Layer<R, E, A>): M.Managed<R, E, T.CustomRuntime<A, unknown>>;
/**
 * Creates a fresh version of this layer that will not be shared.
 */
export declare function fresh<R, E, A>(layer: Layer<R, E, A>): Layer<R, E, A>;
/**
 * Returns a new layer whose output is mapped by the specified function.
 */
export declare function map<A, B>(f: (a: A) => B): <R, E>(fa: Layer<R, E, A>) => Layer<R, E, B>;
/**
 * Maps the output of the layer using f
 */
export declare function map_<R, E, A, B>(fa: Layer<R, E, A>, f: (a: A) => B): Layer<R, E, B>;
/**
 * Chains the output of the layer using f
 */
export declare function chain<R2, E2, A, B>(f: (a: A) => Layer<R2, E2, B>): <R, E>(fa: Layer<R, E, A>) => Layer<R & R2, E2 | E, B>;
/**
 * Chains the output of the layer using f
 */
export declare function chain_<R, E, A, R2, E2, B>(fa: Layer<R, E, A>, f: (a: A) => Layer<R2, E2, B>): LayerChain<R, R2, E, E2, A, B>;
/**
 * Flatten `Layer< R, E, Layer< R2, E2, A>>`
 */
export declare function flatten<R, E, R2, E2, B>(ffa: Layer<R, E, Layer<R2, E2, B>>): Layer<R & R2, E | E2, B>;
/**
 * Restrict output to only contain the specified services
 */
export declare function restrict<Tags extends Tag<any>[]>(...ts: Tags): <R, E>(self: Layer<R, E, UnionToIntersection<{ [k in keyof Tags]: [Tags[k]] extends [Tag<infer A>] ? Has<A> : never; }[number]>>) => Layer<R, E, UnionToIntersection<{ [k_1 in keyof Tags]: [Tags[k_1]] extends [Tag<infer A_1>] ? Has<A_1> : never; }[number]>>;
/**
 * Builds this layer and uses it until it is interrupted. This is useful when
 * your entire application is a layer, such as an HTTP server.
 */
export declare function launch<R, E, A>(self: Layer<R, E, A>): T.Effect<R, E, never>;
/**
 * Recovers from all errors.
 */
export declare function catchAll<R1, E, E1, Out1>(handler: Layer<Tp.Tuple<[R1, E]>, E1, Out1>): <R, Out>(self: Layer<R, E, Out>) => Layer<R & R1, E1, Out1 | Out>;
/**
 * A layer that passes along the first element of a tuple.
 */
export declare function first<A>(): Layer<Tp.Tuple<[A, unknown]>, never, A>;
/**
 * A layer that passes along the second element of a tuple.
 */
export declare function second<A>(): Layer<Tp.Tuple<[unknown, A]>, never, A>;
/**
 * Returns a layer with its error channel mapped using the specified
 * function.
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <R, Out>(self: Layer<R, E, Out>) => Layer<R, E1, Out>;
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the layer.
 */
export declare function orDie<R, E, Out>(self: Layer<R, E, Out>): Layer<R, never, Out>;
/**
 * Executes this layer and returns its output, if it succeeds, but otherwise
 * executes the specified layer.
 */
export declare function orElse<RIn1, E1, ROut1>(that: Layer<RIn1, E1, ROut1>): <R, Out>(self: Layer<R, unknown, Out>) => Layer<R & RIn1, E1, ROut1 | Out>;
/**
 * Retries constructing this layer according to the specified schedule.
 */
export declare function retry<RIn, RIn1, E, ROut>(self: Layer<RIn, E, ROut>, schedule: SC.Schedule<RIn1 & CL.HasClock, E, any>): Layer<RIn1 & RIn & CL.HasClock, E, ROut>;
//# sourceMappingURL=core.d.ts.map