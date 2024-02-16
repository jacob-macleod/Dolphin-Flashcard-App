import * as P from "../../Prelude/index.js";
/**
 * Conditionals
 */
declare const branch: <X extends import("@effect-ts/system/Option/core.js").Option<any>, Y extends import("@effect-ts/system/Option/core.js").Option<any>>(onTrue: () => X, onFalse: () => Y) => (predicate: boolean) => import("@effect-ts/system/Option/core.js").Option<P.Infer<[P.URI<"Option", {}>], P.Auto, "A", X | Y>>;
declare const branch_: <X extends import("@effect-ts/system/Option/core.js").Option<any>, Y extends import("@effect-ts/system/Option/core.js").Option<any>>(predicate: boolean, onTrue: () => X, onFalse: () => Y) => import("@effect-ts/system/Option/core.js").Option<P.Infer<[P.URI<"Option", {}>], P.Auto, "A", X | Y>>;
export { branch as if, branch_ as if_ };
//# sourceMappingURL=conditionals.d.ts.map