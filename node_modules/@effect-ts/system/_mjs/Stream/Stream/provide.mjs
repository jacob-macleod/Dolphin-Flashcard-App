import { provideSome_ } from "./provideSome.mjs";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

export function provide(r) {
  return next => provideSome_(next, r0 => ({ ...r0,
    ...r
  }));
}
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll(r) {
  return self => provideAll_(self, r);
}
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll_(self, r) {
  return provideSome_(self, () => r);
}
//# sourceMappingURL=provide.mjs.map