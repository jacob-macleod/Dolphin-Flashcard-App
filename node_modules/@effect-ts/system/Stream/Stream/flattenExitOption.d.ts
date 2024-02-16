import type * as Ex from "../../Exit/index.js";
import * as O from "../../Option/index.js";
import { Stream } from "./definitions.js";
export declare function flattenExitOption<R, E, E1, O1>(self: Stream<R, E, Ex.Exit<O.Option<E1>, O1>>): Stream<R, E | E1, O1>;
//# sourceMappingURL=flattenExitOption.d.ts.map