/**
 * Function composition (from left to right).
 *
 * @example
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.strictEqual(f('aaa'), 6)
 *
 * @ets_optimize flow
 */
export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B;
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...a: A) => D;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (...a: A) => E;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): (...a: A) => F;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): (...a: A) => G;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): (...a: A) => H;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): (...a: A) => I;
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): (...a: A) => J;
//# sourceMappingURL=flow.d.ts.map