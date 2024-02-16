import "../Operator/index.js";
import * as C from "../Closure/index.js";
/**
 * Partially Ported from https://github.com/samhh/fp-ts-std
 * Partially Ported from https://github.com/0x706b/principia
 */
import * as A from "../Collections/Immutable/Array/index.js";
import * as Eq from "../Equal/index.js";
import type { Predicate } from "../Function/index.js";
import * as I from "../Identity/index.js";
import type { Prod, Sum } from "../Newtype/index.js";
import { And, Or } from "../Newtype/index.js";
export declare const ConjunctionClosure: C.Closure<And>;
export declare const DisjunctionClosure: C.Closure<Or>;
export declare const ProdClosure: C.Closure<Prod<boolean>>;
export declare const SumClosure: C.Closure<Sum<boolean>>;
export declare const ConjunctionIdentity: I.Identity<And>;
export declare const DisjunctionIdentity: I.Identity<Or>;
export declare const ProdIdentity: I.Identity<Prod<boolean>>;
export declare const SumIdentity: I.Identity<Sum<boolean>>;
export declare const Equal: Eq.Equal<boolean>;
export declare function fold<A, B>(onFalse: () => A, onTrue: () => B): (value: boolean) => A | B;
export declare function not(a: boolean): boolean;
export declare function invert(b: boolean): boolean;
export declare function and_(x: boolean, y: boolean): boolean;
export declare function and(y: boolean): (x: boolean) => boolean;
export declare function or_(x: boolean, y: boolean): boolean;
export declare function or(y: boolean): (x: boolean) => boolean;
export declare function xor_(x: boolean, y: boolean): boolean;
export declare function xor(y: boolean): (x: boolean) => boolean;
export declare function allPass_<A>(a: A, ps: A.Array<Predicate<A>>): boolean;
export declare function allPass<A>(ps: A.Array<Predicate<A>>): (a: A) => boolean;
export declare function anyPass_<A>(a: A, ps: A.Array<Predicate<A>>): boolean;
export declare function anyPass<A>(ps: A.Array<Predicate<A>>): (a: A) => boolean;
export declare function andPass_<A>(f: Predicate<A>, g: Predicate<A>): Predicate<A>;
export declare function andPass<A>(g: Predicate<A>): (f: Predicate<A>) => Predicate<A>;
export declare function orPass_<A>(f: Predicate<A>, g: Predicate<A>): Predicate<A>;
export declare function orPass<A>(g: Predicate<A>): (f: Predicate<A>) => Predicate<A>;
//# sourceMappingURL=index.d.ts.map