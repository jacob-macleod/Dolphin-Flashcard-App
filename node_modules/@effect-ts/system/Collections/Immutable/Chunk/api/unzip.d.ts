import * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../definition.js";
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 */
export declare function unzip<A, B>(as: Chunk<Tp.Tuple<[A, B]>>): Tp.Tuple<[Chunk<A>, Chunk<B>]>;
//# sourceMappingURL=unzip.d.ts.map