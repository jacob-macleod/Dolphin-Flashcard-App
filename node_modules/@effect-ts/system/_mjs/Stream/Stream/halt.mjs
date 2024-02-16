import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * The stream that always halts with `cause`.
 */

export const halt = x => fromEffect(T.halt(x));
//# sourceMappingURL=halt.mjs.map