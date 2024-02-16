import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { UIO } from "../Effect/effect.js";
import type * as O from "../Option/index.js";
import type { Atomic } from "./XRef.js";
export declare function getAndSet<A>(self: Atomic<A>, a: A): UIO<A>;
export declare function getAndUpdate<A>(self: Atomic<A>, f: (a: A) => A): UIO<A>;
export declare function getAndUpdateSome<A>(self: Atomic<A>, f: (a: A) => O.Option<A>): UIO<A>;
export declare function modify<A, B>(self: Atomic<A>, f: (a: A) => Tp.Tuple<[B, A]>): UIO<B>;
export declare function modifySome<A, B>(self: Atomic<A>, def: B, f: (a: A) => O.Option<Tp.Tuple<[B, A]>>): UIO<B>;
export declare function update<A>(self: Atomic<A>, f: (a: A) => A): UIO<void>;
export declare function updateAndGet<A>(self: Atomic<A>, f: (a: A) => A): UIO<A>;
export declare function updateSome<A>(self: Atomic<A>, f: (a: A) => O.Option<A>): UIO<void>;
export declare function updateSomeAndGet<A>(self: Atomic<A>, f: (a: A) => O.Option<A>): UIO<A>;
export declare function unsafeUpdate<A>(self: Atomic<A>, f: (a: A) => A): void;
//# sourceMappingURL=atomic.d.ts.map