import type { Has, Tag } from "../../Has/index.js";
import type { AssociativeFlatten } from "../AssociativeFlatten/index.js";
import type { Access, Provide } from "../FX/index.js";
import type * as HKT from "../HKT/index.js";
import type { Monad } from "../Monad/index.js";
export declare function accessMF<F extends HKT.URIS, C = HKT.Auto>(F: Access<F, C> & AssociativeFlatten<F, C>): <K, Q, W, X, I, S, R, R2, E, A>(f: (r: HKT.OrFix<"R", C, R2>) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>) => HKT.Kind<F, C, K, Q, W, X, I, S, R & R2, E, A>;
export declare function accessServiceMF<F extends HKT.URIS, C extends HKT.V<"R", "-">>(F: Monad<F, C> & Access<F, C>): <Service>(H: Tag<Service>) => <K, Q, W, X, I, S, R, E, A>(f: (_: Service) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>) => HKT.Kind<F, C, K, Q, W, X, I, S, R & Has<Service>, E, A>;
export declare function provideServiceF<F extends HKT.URIS, C extends HKT.V<"R", "-">>(F: Monad<F, C> & Access<F, C> & Provide<F, C>): <Service>(H: Tag<Service>) => (S: Service) => <K, Q, W, X, I, S, R, E, A>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R & Has<Service>, E, A>) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>;
export declare function provideSomeF<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C> & Access<F, C> & Provide<F, C>): <R, R2>(f: (_: HKT.OrFix<"R", C, R2>) => HKT.OrFix<"R", C, R>) => <K, Q, W, X, I, S, E, A>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, A>) => HKT.Kind<F, C, K, Q, W, X, I, S, R2, E, A>;
//# sourceMappingURL=access-provide.d.ts.map