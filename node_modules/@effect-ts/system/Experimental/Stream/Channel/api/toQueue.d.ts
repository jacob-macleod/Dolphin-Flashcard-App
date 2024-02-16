import * as E from "../../../../Either/index.js";
import * as Ex from "../../../../Exit/index.js";
import * as Q from "../../../../Queue/index.js";
import * as C from "../core.js";
export declare function toQueue<Err, Done, Elem>(queue: Q.Enqueue<E.Either<Ex.Exit<Err, Done>, Elem>>): C.Channel<unknown, Err, Elem, Done, never, never, any>;
//# sourceMappingURL=toQueue.d.ts.map