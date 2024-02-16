import type { Applicative } from "../Applicative/index.js";
import * as HKT from "../HKT/index.js";
import type { Monad } from "../Monad/index.js";
export declare function getApplicativeF<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C>): Applicative<F, C>;
//# sourceMappingURL=applicative.d.ts.map