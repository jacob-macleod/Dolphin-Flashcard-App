import type { Lazy } from "../../Function/index.js";
import type * as ARM from "../AssertionResultM/index.js";
import type * as R from "../Render/index.js";
import { AssertionM } from "./AssertionM.js";
export declare function apply<A>(render: () => R.Render, runM: (a: Lazy<A>) => ARM.AssertResultM): AssertionM<A>;
//# sourceMappingURL=apply.d.ts.map