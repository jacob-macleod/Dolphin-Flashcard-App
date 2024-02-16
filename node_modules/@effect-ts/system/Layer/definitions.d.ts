import type * as C from "../Cause/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import { _E, _RIn, _ROut } from "../Effect/commons.js";
import * as Finalizer from "../Managed/ReleaseMap/finalizer.js";
import * as RM from "../RefM/index.js";
import { AtomicReference } from "../Support/AtomicReference/index.js";
import type { Erase, UnionToIntersection } from "../Utils/index.js";
import * as T from "./deps-effect.js";
import type { Managed } from "./deps-managed.js";
/**
 * Creates a layer from an effect
 */
export declare function fromRawEffect<R, E, A>(resource: T.Effect<R, E, A>): Layer<R, E, A>;
/**
 * Creates a layer from a function
 */
export declare function fromRawFunction<A, B>(f: (a: A) => B): Layer<A, never, B>;
/**
 * Creates a layer from an effectful function
 */
export declare function fromRawFunctionM<A, R, E, B>(f: (a: A) => T.Effect<R, E, B>): Layer<R & A, E, B>;
/**
 * Creates a layer from a managed environment
 */
export declare function fromRawManaged<R, E, A>(resource: Managed<R, E, A>): Layer<R, E, A>;
/**
 * Constructs a layer that passes along the specified environment as an
 * output.
 */
export declare function identity<R>(): Layer<R, never, R>;
/**
 * Merge two Layers in parallel without providing any data to each other
 *
 * @param self - first Layer to combine
 * @param that - second Layer to combine
 */
export declare function and_<R, E, A, R2, E2, A2>(self: Layer<R, E, A>, that: Layer<R2, E2, A2>): Layer<R & R2, E | E2, A & A2>;
/**
 * Merge two Layers in parallel without providing any data to each other
 *
 * @param that - second Layer to combine
 * @param self - first Layer to combine
 */
export declare function and<R2, E2, A2>(that: Layer<R2, E2, A2>): <R, E, A>(self: Layer<R, E, A>) => Layer<R & R2, E | E2, A & A2>;
/**
 * Feeds the error or output services of this layer into the input of either
 * the specified `failure` or `success` layers, resulting in a new layer with
 * the inputs of this layer, and the error or outputs of the specified layer.
 */
export declare function fold<R, E, A>(self: Layer<R, E, A>): <R2, E2, A2>(failure: Layer<Tp.Tuple<[R2, C.Cause<E>]>, E2, A2>) => <E3, A3>(success: Layer<A, E3, A3>) => Layer<R & R2, E2 | E3, A2 | A3>;
/**
 * Use `from` to partially provide environment into `to`
 */
export declare function using<R2, E2, A2>(from: Layer<R2, E2, A2>): <R, E, A>(to: Layer<A2 & R, E, A>) => Layer<R2 & R, E2 | E, A>;
/**
 * Use `from` to partially provide environment into `to` and merge both
 */
export declare function usingAnd<R2, E2, A2>(from: Layer<R2, E2, A2>): <R, E, A>(to: Layer<A2 & R, E, A>) => Layer<R2 & R, E2 | E, A & A2>;
/**
 * Compose layers
 */
export declare function compose_<R2, E2, A2, E, A>(from: Layer<R2, E2, A2>, to: Layer<A2, E, A>): Layer<R2, E2 | E, A>;
/**
 * Compose layers
 */
export declare function compose<A2, E, A>(to: Layer<A2, E, A>): <R2, E2>(from: Layer<R2, E2, A2>) => Layer<R2, E2 | E, A>;
export declare const hashSym: unique symbol;
export declare abstract class Layer<RIn, E, ROut> {
    readonly [hashSym]: AtomicReference<PropertyKey>;
    readonly [_RIn]: (_: RIn) => void;
    readonly [_E]: () => E;
    readonly [_ROut]: () => ROut;
    /**
     * Set the hash key for memoization
     */
    setKey(hash: PropertyKey): this;
    ["_I"](): LayerInstruction;
    /**
     * Use that Layer to provide data to this
     */
    ["<=<"]<R2, E2>(that: Layer<R2, E2, RIn>): Layer<R2, E2 | E, ROut>;
    /**
     * Use this Layer to provide data to that
     */
    [">=>"]<E2, A2>(that: Layer<ROut, E2, A2>): Layer<RIn, E2 | E, A2>;
    /**
     * Use that Layer to partially provide data to this
     */
    ["<<<"]<R2, E2, A2>(that: Layer<R2, E2, A2>): Layer<Erase<RIn, A2> & R2, E2 | E, ROut>;
    /**
     * Use this Layer to partially provide data to that
     */
    [">>>"]<R2, E2, A2>(that: Layer<R2, E2, A2>): Layer<Erase<R2, ROut> & RIn, E2 | E, A2>;
    /**
     * Create a Layer with the data from both Layers, while providing the data from this to that
     */
    [">+>"]<R2, E2, A2>(that: Layer<R2, E2, A2>): Layer<RIn & Erase<ROut & R2, ROut>, E2 | E, ROut & A2>;
    /**
     * Create a Layer with the data from both Layers, while providing the data from that to this
     */
    ["<+<"]<R2, E2, A2>(that: Layer<R2, E2, A2>): Layer<Erase<RIn & A2, A2> & R2, E | E2, ROut & A2>;
    /**
     * Combine both layers in parallel
     */
    ["+++"]<R2, E2, A2>(from: Layer<R2, E2, A2>): Layer<R2 & RIn, E2 | E, ROut & A2>;
    /**
     * Use the layer to provide partial environment to an effect
     */
    use<R, E1, A>(effect: T.Effect<R & ROut, E1, A>): T.Effect<RIn & R, E | E1, A>;
    /**
     * Use the layer to provide the full environment to an effect
     */
    useAll<E1, A>(effect: T.Effect<ROut, E1, A>): T.Effect<RIn, E | E1, A>;
    /**
     * Use the layer to provide the full environment to an effect
     */
    get useForever(): T.Effect<RIn, E, never>;
}
/**
 * Provides a layer to the given effect
 */
export declare function provideSomeLayer<R, E, A>(layer: Layer<R, E, A>): <R1, E1, A1>(self: T.Effect<R1 & A, E1, A1>) => T.Effect<R & R1, E | E1, A1>;
/**
 * Provides a layer to the given effect
 */
export declare function provideSomeLayer_<R1, E1, A1, R, E, A>(self: T.Effect<R1 & A, E1, A1>, layer: Layer<R, E, A>): T.Effect<R & R1, E | E1, A1>;
/**
 * Provides a layer to the given effect
 */
export declare function provideLayer_<R, E, A, E1, A1>(self: T.Effect<A, E1, A1>, layer: Layer<R, E, A>): T.Effect<R, E | E1, A1>;
/**
 * Provides a layer to the given effect
 */
export declare function provideLayer<R, E, A>(layer: Layer<R, E, A>): <E1, A1>(self: T.Effect<A, E1, A1>) => T.Effect<R, E | E1, A1>;
export declare type LayerInstruction = LayerFold<any, any, any, any, any, any, any, any> | LayerFresh<any, any, any> | LayerManaged<any, any, any> | LayerSuspend<any, any, any> | LayerZipWithPar<any, any, any, any, any, any, any> | LayerZipWithSeq<any, any, any, any, any, any, any> | LayerAllPar<any> | LayerAllSeq<any> | LayerMap<any, any, any, any> | LayerChain<any, any, any, any, any, any>;
export declare class LayerFold<R, E, A, R2, E2, A2, E3, A3> extends Layer<R & R2, E2 | E3, A2 | A3> {
    readonly self: Layer<R, E, A>;
    readonly failure: Layer<Tp.Tuple<[R2, C.Cause<E>]>, E2, A2>;
    readonly success: Layer<A, E3, A3>;
    readonly _tag = "LayerFold";
    constructor(self: Layer<R, E, A>, failure: Layer<Tp.Tuple<[R2, C.Cause<E>]>, E2, A2>, success: Layer<A, E3, A3>);
}
export declare class LayerMap<RIn, E, ROut, ROut1> extends Layer<RIn, E, ROut1> {
    readonly self: Layer<RIn, E, ROut>;
    readonly f: (a: ROut) => ROut1;
    readonly _tag = "LayerMap";
    constructor(self: Layer<RIn, E, ROut>, f: (a: ROut) => ROut1);
}
export declare class LayerChain<RIn, RIn2, E, E2, ROut, ROut1> extends Layer<RIn & RIn2, E | E2, ROut1> {
    readonly self: Layer<RIn, E, ROut>;
    readonly f: (a: ROut) => Layer<RIn2, E2, ROut1>;
    readonly _tag = "LayerChain";
    constructor(self: Layer<RIn, E, ROut>, f: (a: ROut) => Layer<RIn2, E2, ROut1>);
}
export declare class LayerFresh<RIn, E, ROut> extends Layer<RIn, E, ROut> {
    readonly self: Layer<RIn, E, ROut>;
    readonly _tag = "LayerFresh";
    constructor(self: Layer<RIn, E, ROut>);
}
export declare class LayerManaged<RIn, E, ROut> extends Layer<RIn, E, ROut> {
    readonly self: Managed<RIn, E, ROut>;
    readonly _tag = "LayerManaged";
    constructor(self: Managed<RIn, E, ROut>);
}
export declare class LayerSuspend<RIn, E, ROut> extends Layer<RIn, E, ROut> {
    readonly self: () => Layer<RIn, E, ROut>;
    readonly _tag = "LayerSuspend";
    constructor(self: () => Layer<RIn, E, ROut>);
}
export declare class LayerZipWithPar<RIn, E, ROut, RIn1, E1, ROut2, ROut3> extends Layer<RIn & RIn1, E | E1, ROut3> {
    readonly self: Layer<RIn, E, ROut>;
    readonly that: Layer<RIn1, E1, ROut2>;
    readonly f: (s: ROut, t: ROut2) => ROut3;
    readonly _tag = "LayerZipWithPar";
    constructor(self: Layer<RIn, E, ROut>, that: Layer<RIn1, E1, ROut2>, f: (s: ROut, t: ROut2) => ROut3);
}
export declare type MergeR<Ls extends Layer<any, any, any>[]> = UnionToIntersection<{
    [k in keyof Ls]: [Ls[k]] extends [Layer<infer X, any, any>] ? unknown extends X ? never : X : never;
}[number]>;
export declare type MergeE<Ls extends Layer<any, any, any>[]> = {
    [k in keyof Ls]: [Ls[k]] extends [Layer<any, infer X, any>] ? X : never;
}[number];
export declare type MergeA<Ls extends Layer<any, any, any>[]> = UnionToIntersection<{
    [k in keyof Ls]: [Ls[k]] extends [Layer<any, any, infer X>] ? unknown extends X ? never : X : never;
}[number]>;
export declare class LayerAllPar<Layers extends Layer<any, any, any>[]> extends Layer<MergeR<Layers>, MergeE<Layers>, MergeA<Layers>> {
    readonly layers: Layers & {
        0: Layer<any, any, any>;
    };
    readonly _tag = "LayerAllPar";
    constructor(layers: Layers & {
        0: Layer<any, any, any>;
    });
}
export declare class LayerAllSeq<Layers extends Layer<any, any, any>[]> extends Layer<MergeR<Layers>, MergeE<Layers>, MergeA<Layers>> {
    readonly layers: Layers & {
        0: Layer<any, any, any>;
    };
    readonly _tag = "LayerAllSeq";
    constructor(layers: Layers & {
        0: Layer<any, any, any>;
    });
}
export declare class LayerZipWithSeq<RIn, E, ROut, RIn1, E1, ROut2, ROut3> extends Layer<RIn & RIn1, E | E1, ROut3> {
    readonly self: Layer<RIn, E, ROut>;
    readonly that: Layer<RIn1, E1, ROut2>;
    readonly f: (s: ROut, t: ROut2) => ROut3;
    readonly _tag = "LayerZipWithSeq";
    constructor(self: Layer<RIn, E, ROut>, that: Layer<RIn1, E1, ROut2>, f: (s: ROut, t: ROut2) => ROut3);
}
export declare function scope<R, E, A>(_: Layer<R, E, A>): Managed<unknown, never, (_: MemoMap) => Managed<R, E, A>>;
/**
 * Builds a layer into a managed value.
 */
export declare function build<R, E, A>(_: Layer<R, E, A>): Managed<R, E, A>;
/**
 * Creates a MemoMap
 */
export declare function makeMemoMap(): T.Effect<unknown, never, MemoMap>;
/**
 * A `MemoMap` memoizes dependencies.
 */
export declare class MemoMap {
    readonly ref: RM.RefM<ReadonlyMap<PropertyKey, Tp.Tuple<[T.IO<any, any>, Finalizer.Finalizer]>>>;
    constructor(ref: RM.RefM<ReadonlyMap<PropertyKey, Tp.Tuple<[T.IO<any, any>, Finalizer.Finalizer]>>>);
    /**
     * Checks the memo map to see if a dependency exists. If it is, immediately
     * returns it. Otherwise, obtains the dependency, stores it in the memo map,
     * and adds a finalizer to the outer `Managed`.
     */
    getOrElseMemoize: <R, E, A>(layer: Layer<R, E, A>) => Managed<R, E, A>;
}
/**
 * Empty layer, useful for init cases
 */
export declare const Empty: Layer<unknown, never, unknown>;
//# sourceMappingURL=definitions.d.ts.map