import * as Core from "./core.js";
declare function bind<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => Core.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>): <Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1>(mk: Core.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, K>) => Core.Channel<Env & Env1, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem | OutElem1, K & { [k in N]: OutDone; }>;
declare function let_<OutDone, K, N extends string>(tag: Exclude<N, keyof K>, f: (_: K) => OutDone): <Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1>(mk: Core.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, K>) => Core.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, K & { [k in N]: OutDone; }>;
declare const do_: Core.Channel<unknown, unknown, unknown, unknown, never, never, {}>;
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.d.ts.map