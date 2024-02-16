declare global {
    interface Object {
        /**
         * To be used like
         * ```ts
         * T.succeed(1)["|>"](T.map(n => n + 1))["|>"](T.map(n => n + 2))
         * ```
         *
         * @ets_optimize operator
         */
        ["|>"]<Self, Result>(this: Self, next: (value: Self) => Result): Result;
    }
}
export declare function patch(): void;
export {};
//# sourceMappingURL=index.d.ts.map