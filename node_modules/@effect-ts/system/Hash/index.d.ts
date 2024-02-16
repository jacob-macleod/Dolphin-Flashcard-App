import "../Operator/index.js";
/**
 * `Hash[A]` provides a way to hash a value
 */
export interface Hash<A> {
    readonly hash: (x: A) => number;
}
export declare function makeHash<A>(hash: (x: A) => number): Hash<A>;
//# sourceMappingURL=index.d.ts.map