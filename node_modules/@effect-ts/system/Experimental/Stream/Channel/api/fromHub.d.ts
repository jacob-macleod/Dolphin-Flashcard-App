import type * as E from "../../../../Either/index.js";
import type * as Ex from "../../../../Exit/index.js";
import * as H from "../../../../Hub/index.js";
import type * as C from "../core.js";
export declare function fromHub<Err, Done, Elem>(hub: H.Hub<E.Either<Ex.Exit<Err, Done>, Elem>>): C.Channel<unknown, unknown, unknown, unknown, Err, Elem, Done>;
//# sourceMappingURL=fromHub.d.ts.map