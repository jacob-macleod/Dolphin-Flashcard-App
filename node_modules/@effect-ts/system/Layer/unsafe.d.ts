import type { Layer } from "./definitions.js";
import * as T from "./deps-effect.js";
export declare class MainProvider<R1, E, R> {
    readonly allocate: T.Effect<R1 & T.DefaultEnv, E, boolean>;
    readonly release: T.UIO<void>;
    readonly provide: <R2, E1, A1>(self: T.Effect<R & R2 & T.DefaultEnv, E1, A1>) => T.Effect<R2, E | E1, A1>;
    constructor(allocate: T.Effect<R1 & T.DefaultEnv, E, boolean>, release: T.UIO<void>, provide: <R2, E1, A1>(self: T.Effect<R & R2 & T.DefaultEnv, E1, A1>) => T.Effect<R2, E | E1, A1>);
}
/**
 * Unsafely returns a `MainProvider` to be used in frontend-like
 * contexts where initialization needs to be global and sync
 */
export declare function unsafeMainProvider<R1, E, R>(self: Layer<R1, E, R>): MainProvider<R1, E, R>;
//# sourceMappingURL=unsafe.d.ts.map