import type { HasHash } from "../HasHash/index.js";
export declare const equalsSym: unique symbol;
export interface HasEquals extends HasHash {
    readonly [equalsSym]: (other: unknown) => boolean;
}
export declare function hasEquals(u: unknown): u is HasEquals;
export declare const deepEquals: import("./utils.js").EqualityComparator;
export declare function equals(a: unknown, b: unknown): boolean;
//# sourceMappingURL=index.d.ts.map