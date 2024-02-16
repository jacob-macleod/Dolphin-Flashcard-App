import * as T from "../../../Effect/index.js";
import * as C from "./core.js";
export declare function dropWhileEffect<R, InErr, In>(p: (in_: In) => T.Effect<R, InErr, boolean>): C.Sink<R, InErr, In, InErr, In, any>;
//# sourceMappingURL=dropWhileEffect.d.ts.map