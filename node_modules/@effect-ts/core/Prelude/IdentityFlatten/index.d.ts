import type { Any } from "../Any/index.js";
import type { AssociativeFlatten } from "../AssociativeFlatten/index.js";
import type { Auto, URIS } from "../HKT/index.js";
export declare type IdentityFlatten<F extends URIS, C = Auto> = AssociativeFlatten<F, C> & Any<F, C>;
//# sourceMappingURL=index.d.ts.map