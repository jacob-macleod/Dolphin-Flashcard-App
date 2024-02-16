export { ShowURI } from "../Modules/index.js";
/**
 * `Show[A]` provides implicit evidence that values of type `A` have a total
 * ordering.
 */
export interface Show<A> {
    readonly show: (x: A) => string;
}
/**
 * Creates Show[A] from equals & compare functions
 */
export declare function makeShow<A>(show: (x: A) => string): Show<A>;
//# sourceMappingURL=definitions.d.ts.map