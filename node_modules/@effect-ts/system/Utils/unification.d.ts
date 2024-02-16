import type { Unify } from "./union.js";
export interface HasUnify {
    /**
     * @ets_rewrite_method _ from "smart:identity"
     */
    unify<Self>(this: Self): Unify<Self>;
}
declare global {
    interface Object extends HasUnify {
    }
    interface Function extends HasUnify {
        /**
         * @ets_rewrite_method _ from "smart:identity"
         */
        unify<Self extends any[], Ret>(this: (...args: Self) => Ret): (...args: Self) => Unify<Ret>;
    }
}
export declare function patch(): void;
export {};
//# sourceMappingURL=unification.d.ts.map