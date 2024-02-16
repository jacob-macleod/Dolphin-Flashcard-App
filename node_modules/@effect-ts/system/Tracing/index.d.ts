export declare const tracingSymbol = "$trace";
export declare function traceCall<F extends Function>(f: F, trace: string | undefined): F;
export declare function traceCallLast<A, B>(f: (a: A, __trace?: string) => B, __trace: string | undefined): (a: A, __trace?: string) => B;
export declare function accessCallTrace(): string | undefined;
export * from "./Global/index.js";
//# sourceMappingURL=index.d.ts.map