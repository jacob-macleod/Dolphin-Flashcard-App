import * as P from "../../Prelude/index.js";
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => P.MatchFn<[P.URI<"Option", {}>], P.Auto, N>, matchIn: <N extends string>(tag: N) => P.MatchInFn<[P.URI<"Option", {}>], P.Auto, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => P.MatchMorphFn<[P.URI<"Option", {}>], P.Auto, N, X>, matchTag: P.MatchFn<[P.URI<"Option", {}>], P.Auto, "_tag">, matchTagIn: P.MatchInFn<[P.URI<"Option", {}>], P.Auto, "_tag">;
//# sourceMappingURL=matchers.d.ts.map