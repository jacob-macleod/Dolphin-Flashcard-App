import { environment } from "./environment.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Accesses the environment of the stream in the context of an effect.
 */

export function accessM(f) {
  return mapM_(environment(), f);
}
//# sourceMappingURL=accessM.mjs.map