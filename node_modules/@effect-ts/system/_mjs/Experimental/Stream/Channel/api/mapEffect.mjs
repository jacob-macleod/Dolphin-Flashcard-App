import * as C from "../core.mjs";
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 */

export function mapEffect_(self, f) {
  return C.chain_(self, z => C.fromEffect(f(z)));
}
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.mjs.map