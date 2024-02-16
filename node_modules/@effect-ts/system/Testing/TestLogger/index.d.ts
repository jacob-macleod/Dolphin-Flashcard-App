import * as T from "../../Effect/index.js";
import * as L from "../../Layer/index.js";
export declare const LoggerId: unique symbol;
export interface TestLogger {
    readonly serviceId: typeof LoggerId;
    readonly logLine: (line: string) => T.UIO<void>;
}
export declare const TestLogger: import("../../Has/index.js").Tag<TestLogger>;
export declare const FromConsole: L.Layer<unknown, never, import("../../Has/index.js").Has<TestLogger>>;
export declare const logLine: (line: string) => T.Effect<import("../../Has/index.js").Has<TestLogger>, never, void>;
//# sourceMappingURL=index.d.ts.map