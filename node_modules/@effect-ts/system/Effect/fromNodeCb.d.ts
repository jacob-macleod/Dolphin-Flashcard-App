import type { IO } from "./effect.js";
export declare function fromNodeCb<L, R>(f: (this: unknown, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): () => IO<L, R>;
export declare function fromNodeCb<A, L, R>(f: (this: unknown, a: A, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): (a: A) => IO<L, R>;
export declare function fromNodeCb<A, B, L, R>(f: (this: unknown, a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): (a: A, b: B) => IO<L, R>;
export declare function fromNodeCb<A, B, C, L, R>(f: (this: unknown, a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): (a: A, b: B, c: C) => IO<L, R>;
export declare function fromNodeCb<A, B, C, D, L, R>(f: (this: unknown, a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): (a: A, b: B, c: C, d: D) => IO<L, R>;
export declare function fromNodeCb<A, B, C, D, E, L, R>(f: (this: unknown, a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void, __trace?: string): (a: A, b: B, c: C, d: D, e: E) => IO<L, R>;
export declare function fromNodeCb<A extends any[], L, R>(f: (this: unknown, ...args: [...A, (e: L | null | undefined, r?: R) => void]) => void, __trace?: string): (...args: A) => IO<L, R>;
//# sourceMappingURL=fromNodeCb.d.ts.map