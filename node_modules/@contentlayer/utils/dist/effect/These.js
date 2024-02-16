// ets_tracing: off
// copied from https://github.com/Effect-TS/schema/blob/master/packages/schema/src/These/index.ts
import { pipe } from '@effect-ts/core';
import * as Tp from '@effect-ts/core/Collections/Immutable/Tuple';
import { _A, _E } from '@effect-ts/core/Effect';
import { E, O, T } from './index.js';
export class These {
    constructor(either) {
        this.either = either;
    }
}
export function succeed(a) {
    return new These(E.right(Tp.tuple(a, O.none)));
}
export function warn(a, e) {
    return new These(E.right(Tp.tuple(a, O.some(e))));
}
export function warnOption(a, e) {
    return new These(E.right(Tp.tuple(a, e)));
}
export function fail(e) {
    return new These(E.left(e));
}
export const isNonFailure = (self) => E.isRight(self.either);
export function foldM_(self, onSuccess, onBoth, onFail) {
    return new These(E.fold_(self.either, (x) => onFail(x).either, ({ tuple: [result, warnings] }) => warnings._tag === 'None' ? onSuccess(result).either : onBoth(result, warnings.value).either));
}
export function foldM(onSuccess, onBoth, onFail) {
    return (self) => foldM_(self, onSuccess, onBoth, onFail);
}
export function map_(self, f) {
    return foldM_(self, (a) => succeed(f(a)), (a, e) => warn(f(a), e), fail);
}
export function map(f) {
    return (self) => map_(self, f);
}
export function mapError_(self, f) {
    return foldM_(self, (a) => succeed(a), (a, e) => warn(a, f(e)), (e) => fail(f(e)));
}
export function mapError(f) {
    return (self) => mapError_(self, f);
}
export function chain_(self, f) {
    return foldM_(self, (a) => f(a, O.none), (a, _) => f(a, O.some(_)), fail);
}
export function chain(f) {
    return (self) => chain_(self, f);
}
export function result(self) {
    return self.either;
}
export const errorOrWaning = (self) => {
    return E.fold_(self.either, O.some, (tp) => tp.get(1));
};
/** Unpacks the provided `These` into a new `Effect` with errors as `E` and values as value/warning tuple */
export const toEffect = (self) => {
    return pipe(result(self), E.fold(T.fail, T.succeed));
};
export const effectUnwrapValue = (effect) => {
    return pipe(effect, T.chain((these) => E.fold_(these.either, T.fail, ({ tuple: [a] }) => T.succeed(a))));
};
export const effectTapSuccess = (tapFn) => (effect) => {
    return T.tap_(effect, (these) => pipe(result(these), E.fold(() => T.unit, (tp) => tapFn(tp.get(0)))));
};
export const effectTapErrorOrWarning = (tapFn) => (effect) => {
    return T.tap_(effect, (these) => pipe(errorOrWaning(these), O.fold(() => T.unit, (e) => tapFn(e))));
};
// export const effectValueOrElse = <T, E1, E2, A>(effect: T.Effect<T, E1, These<E2, A>>): T.Effect<T, E1 | E2, A> => {
//   return pipe(
//     effect,
//     T.chain((these) => E.fold_(these.either, T.fail, ({ tuple: [a] }) => T.succeed(a))),
//   )
// }
/** Wraps the error channel of an Effect<_, _ These> into the These */
export const effectThese = (effect) => {
    return pipe(effect, T.either, T.map(E.fold((e) => fail(e), (t) => t)));
};
/** Casts warnings to errors (and ignores the value in the warning case) */
export const effectToEither = (effect) => pipe(effect, T.map((these) => E.fold_(these.either, (e2) => E.left(e2), ({ tuple: [val, optE2] }) => O.fold_(optE2, () => E.right(val), (e2) => E.left(e2)))));
//# sourceMappingURL=These.js.map