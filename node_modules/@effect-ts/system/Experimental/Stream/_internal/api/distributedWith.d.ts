import * as L from "../../../../Collections/Immutable/List/index.js";
import * as T from "../../../../Effect/index.js";
import type * as Ex from "../../../../Exit/index.js";
import type { Predicate } from "../../../../Function/index.js";
import * as M from "../../../../Managed/index.js";
import type * as O from "../../../../Option/index.js";
import type * as Q from "../../../../Queue/index.js";
import type * as C from "../core.js";
/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */
export declare function distributedWith_<R, E, A>(self: C.Stream<R, E, A>, n: number, maximumLag: number, decide: (a: A) => T.UIO<Predicate<number>>): M.RIO<R, L.List<Q.Dequeue<Ex.Exit<O.Option<E>, A>>>>;
/**
 * More powerful version of `Stream#broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 *
 * @ets_data_first distributedWith_
 */
export declare function distributedWith<A>(n: number, maximumLag: number, decide: (a: A) => T.UIO<Predicate<number>>): <R, E>(self: C.Stream<R, E, A>) => M.RIO<R, L.List<Q.Dequeue<Ex.Exit<O.Option<E>, A>>>>;
//# sourceMappingURL=distributedWith.d.ts.map