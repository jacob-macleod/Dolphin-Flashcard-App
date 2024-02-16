import type { Option } from "../Option/index.js";
import type { FiberID } from "./id.js";
import type { Status } from "./status.js";
export interface FiberDump {
    _tag: "FiberDump";
    fiberId: FiberID;
    fiberName: Option<string>;
    status: Status;
}
export declare const FiberDump: (fiberId: FiberID, fiberName: Option<string>, status: Status) => FiberDump;
//# sourceMappingURL=dump.d.ts.map