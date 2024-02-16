import * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
/**
 * A sink that executes the provided effectful function for every element fed to it.
 */
export declare function forEach<R, ErrIn, Err, In, B>(f: (_in: In) => T.Effect<R, Err, B>): C.Sink<R, ErrIn, In, ErrIn | Err, unknown, void>;
//# sourceMappingURL=forEach.d.ts.map