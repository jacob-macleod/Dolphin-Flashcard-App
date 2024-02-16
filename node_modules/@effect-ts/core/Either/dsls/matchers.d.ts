import * as DSL from "../../Prelude/DSL/index.js";
/**
 * Matchers
 */
export declare const match: <N extends string>(tag: N) => DSL.MatchFn<[import("../../Prelude/index.js").URI<"Either", {}>], import("../definition.js").V, N>, matchIn: <N extends string>(tag: N) => DSL.MatchInFn<[import("../../Prelude/index.js").URI<"Either", {}>], import("../definition.js").V, N>, matchMorph: <N extends string, X extends { [tag in N]: string; }>(MorphADT: {
    tag: N;
    _A: X;
}) => DSL.MatchMorphFn<[import("../../Prelude/index.js").URI<"Either", {}>], import("../definition.js").V, N, X>, matchTag: DSL.MatchFn<[import("../../Prelude/index.js").URI<"Either", {}>], import("../definition.js").V, "_tag">, matchTagIn: DSL.MatchInFn<[import("../../Prelude/index.js").URI<"Either", {}>], import("../definition.js").V, "_tag">;
//# sourceMappingURL=matchers.d.ts.map