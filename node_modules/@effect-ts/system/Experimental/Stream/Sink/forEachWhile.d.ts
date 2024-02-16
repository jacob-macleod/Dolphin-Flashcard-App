import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * A sink that executes the provided effectful function for every element fed to it
 * until `f` evaluates to `false`.
 */
export declare function forEachWhile<R, ErrIn, ErrOut, In>(f: (_in: In) => T.Effect<R, ErrOut, boolean>): C.Sink<R, ErrIn, In, ErrIn | ErrOut, In, void>;
//# sourceMappingURL=forEachWhile.d.ts.map