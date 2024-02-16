/** Promise.all + Array.map */
export declare const promiseMap: <T, Res>(arr: T[], map: (el: T, index?: number) => Res | Promise<Res>) => Promise<(Awaited<Res> | Awaited<Res>)[]>;
export declare const promiseMapDict: <T, Res>(dict: Record<string, T>, map: (el: T, index?: number) => Res | Promise<Res>) => Promise<Record<string, Res>>;
export declare const promiseMapToDict: <T, Res>(arr: T[], mapValue: (el: T, index?: number) => Res | Promise<Res>, mapKey: (el: T, index?: number) => string) => Promise<Record<string, Res>>;
export declare const promiseMapPool: <T, Res>(arr: T[], map: (el: T, index?: number) => Promise<Res>, poolLimit: number) => Promise<Res[]>;
//# sourceMappingURL=promise.d.ts.map