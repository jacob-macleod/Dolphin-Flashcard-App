import * as O from "@effect-ts/system/Option";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Either } from "../../Either/index.js";
export declare function separate<A, B>(ma: O.Option<Either<A, B>>): Tp.Tuple<[O.Option<A>, O.Option<B>]>;
//# sourceMappingURL=separate.d.ts.map