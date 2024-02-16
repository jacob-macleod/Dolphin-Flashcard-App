// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { matchTag } from "../Utils/index.mjs";
import * as T from "./excl-effect.mjs";
import { concrete } from "./fiberRef.mjs";
/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 *
 * @ets_data_first modify_
 */

export function modify(f) {
  return fiberRef => modify_(fiberRef, f);
}
/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */

export function modify_(fiberRef, f) {
  return matchTag({
    Runtime: self => self.modify(f),
    Derived: self => self.use((value, getEither, setEither) => T.absolve(value.modify(s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1)))))),
    DerivedAll: self => self.use((value, getEither, setEither) => T.absolve(value.modify(s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2)(s), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1))))))
  })(fiberRef);
}
//# sourceMappingURL=modify.mjs.map