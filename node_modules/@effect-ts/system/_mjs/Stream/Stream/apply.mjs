import { Stream } from "./definitions.mjs";
/**
 * Creates a new {@link Stream} from a managed effect that yields chunks.
 * The effect will be evaluated repeatedly until it fails with a `None`
 * (to signify stream end) or a `Some<E>` (to signify stream failure).
 *
 * The stream evaluation guarantees proper acquisition and release of the
 * {@link Managed}.
 */

export function apply(proc) {
  return new Stream(proc);
}
//# sourceMappingURL=apply.mjs.map