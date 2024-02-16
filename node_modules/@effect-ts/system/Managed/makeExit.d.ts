import * as T from "./deps-core.js";
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first makeExit_
 */
export declare function makeExit<R1, A, X>(release: (a: A, exit: T.Exit<any, any>) => T.Effect<R1, never, X>, __trace?: string): <R, E>(acquire: T.Effect<R, E, A>) => import("./managed.js").Managed<R & R1, E, A>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 */
export declare function makeExit_<R, E, A, R1, X>(acquire: T.Effect<R, E, A>, release: (a: A, exit: T.Exit<any, any>) => T.Effect<R1, never, X>, __trace?: string): import("./managed.js").Managed<R & R1, E, A>;
//# sourceMappingURL=makeExit.d.ts.map