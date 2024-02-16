import * as T from "./deps-core.js";
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with no release action. The
 * effect will be performed interruptibly.
 */
export declare function fromEffect<R, E, A>(effect: T.Effect<R, E, A>, __trace?: string): import("./managed.js").Managed<R, E, A>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed<R, E, A>` with no release action. The
 * effect will be performed uninterruptibly. You usually want the `fromEffect`
 * variant.
 */
export declare function fromEffectUninterruptible<R, E, A>(effect: T.Effect<R, E, A>, __trace?: string): import("./managed.js").Managed<R, E, A>;
//# sourceMappingURL=fromEffect.d.ts.map