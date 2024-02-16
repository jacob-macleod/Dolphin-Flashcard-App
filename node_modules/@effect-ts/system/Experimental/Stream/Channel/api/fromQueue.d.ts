import * as E from "../../../../Either/index.js";
import * as Ex from "../../../../Exit/index.js";
import * as Q from "../../../../Queue/index.js";
import * as C from "../core.js";
export declare function fromQueue<Err, Elem, Done>(queue: Q.Dequeue<E.Either<Ex.Exit<Err, Done>, Elem>>): C.Channel<unknown, unknown, unknown, unknown, Err, Elem, Done>;
//# sourceMappingURL=fromQueue.d.ts.map