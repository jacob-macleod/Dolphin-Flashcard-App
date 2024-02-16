import * as T from "../effect.js";
export declare type Decision<Env, Inp, Out> = Done<Out> | Continue<Env, Inp, Out>;
export declare type Interval = number;
export declare type StepFunction<Env, Inp, Out> = (interval: Interval, inp: Inp) => T.Effect<Env, never, Decision<Env, Inp, Out>>;
export declare class Done<Out> {
    readonly out: Out;
    readonly _tag = "Done";
    constructor(out: Out);
}
export declare class Continue<Env, Inp, Out> {
    readonly out: Out;
    readonly interval: Interval;
    readonly next: StepFunction<Env, Inp, Out>;
    readonly _tag = "Continue";
    constructor(out: Out, interval: Interval, next: StepFunction<Env, Inp, Out>);
}
export declare function makeDone<Out>(o: Out): Decision<unknown, unknown, Out>;
export declare function makeContinue<Env, Inp, Out>(out: Out, interval: Interval, next: StepFunction<Env, Inp, Out>): Decision<Env, Inp, Out>;
export declare function toDone<Env, Inp, Out>(self: Decision<Env, Inp, Out>): Done<Out>;
export declare function map<Out, Out1>(f: (o: Out) => Out1): <Env, Inp>(self: Decision<Env, Inp, Out>) => Decision<Env, Inp, Out1>;
export declare function contramap<Inp, Inp1>(f: (i: Inp1) => Inp): <Env, Out>(self: Decision<Env, Inp, Out>) => Decision<Env, Inp1, Out>;
export declare function as<Out1>(o: Out1): <Env, Inp, Out>(self: Decision<Env, Inp, Out>) => Decision<Env, Inp, Out1>;
export declare function done<A>(a: A): StepFunction<unknown, unknown, A>;
//# sourceMappingURL=index.d.ts.map