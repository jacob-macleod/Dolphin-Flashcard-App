import type { Associative } from "../../Associative/index.js";
import type { Applicative } from "../Applicative/index.js";
import type { Fail } from "../FX/Fail/index.js";
import type { Run } from "../FX/Run/index.js";
import * as HKT from "../HKT/index.js";
import type { Monad } from "../Monad/index.js";
export declare function getValidationF<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C> & Run<F, C> & Fail<F, C> & Applicative<F, C>): <Z>(A: Associative<Z>) => Applicative<F, HKT.CleanParam<C, "E"> & HKT.Fix<"E", Z>>;
//# sourceMappingURL=validation.d.ts.map