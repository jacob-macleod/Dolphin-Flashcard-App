export declare const do_: import("@effect-ts/system/Option/core.js").Option<{}>;
export declare const let_: <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: import("@effect-ts/system/Option/core.js").Option<BK>) => import("@effect-ts/system/Option/core.js").Option<BK & { [k in BN]: BA; }>;
export { do_ as do, let_ as let };
export declare const bind: <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => import("@effect-ts/system/Option/core.js").Option<BA>) => <K, Q, W, X, I, S, R, E>(fa: import("@effect-ts/system/Option/core.js").Option<BK>) => import("@effect-ts/system/Option/core.js").Option<BK & { [k in BN]: BA; }>;
//# sourceMappingURL=do.d.ts.map