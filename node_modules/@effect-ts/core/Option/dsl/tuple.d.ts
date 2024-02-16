export declare const tuple: <T extends import("@effect-ts/system/Option/core.js").Option<unknown>[], K = any, Q = any, W = any, X = any, I = any, S = any, R = any, E = any>(...t: T & {
    readonly 0: import("@effect-ts/system/Option/core.js").Option<unknown>;
}) => import("@effect-ts/system/Option/core.js").Option<{ [K_1 in keyof T]: [T[K_1]] extends [import("@effect-ts/system/Option/core.js").Option<infer A>] ? A : never; }>;
//# sourceMappingURL=tuple.d.ts.map