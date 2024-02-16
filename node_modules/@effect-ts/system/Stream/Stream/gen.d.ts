import type * as E from "../../Either/index.js";
import { NoSuchElementException } from "../../GlobalExceptions/index.js";
import type * as H from "../../Has/index.js";
import type * as O from "../../Option/index.js";
import type * as Utils from "../../Utils/index.js";
import * as T from "../_internal/effect.js";
import { _A, _E, _R } from "../_internal/effect.js";
import { Stream } from "./definitions.js";
export declare class GenStream<R, E, A> {
    readonly effect: () => Stream<R, E, A>;
    readonly [_R]: (_R: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: () => Stream<R, E, A>);
    [Symbol.iterator](): Generator<GenStream<R, E, A>, A, any>;
}
export declare function gen<RBase, EBase, AEff>(): <Eff extends GenStream<RBase, EBase, any>>(f: (i: {
    <A>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>;
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>;
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>;
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>;
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>;
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>;
}) => Generator<Eff, AEff, any>) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>;
export declare function gen<EBase, AEff>(): <Eff extends GenStream<any, EBase, any>>(f: (i: {
    <A>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>;
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>;
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>;
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>;
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>;
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>;
}) => Generator<Eff, AEff, any>) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>;
export declare function gen<AEff>(): <Eff extends GenStream<any, any, any>>(f: (i: {
    <A>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>;
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>;
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>;
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>;
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>;
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>;
}) => Generator<Eff, AEff, any>) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>;
export declare function gen<Eff extends GenStream<any, any, any>, AEff>(f: (i: {
    <A>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>;
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>;
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>;
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>;
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>;
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>;
}) => Generator<Eff, AEff, any>): Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map