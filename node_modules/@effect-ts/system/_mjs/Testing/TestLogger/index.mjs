// ets_tracing: off
import * as T from "../../Effect/index.mjs";
import { tag } from "../../Has/index.mjs";
import * as L from "../../Layer/index.mjs";
export const LoggerId = /*#__PURE__*/Symbol.for("@effect-ts/system/Test/TestLoggerId");
export const TestLogger = /*#__PURE__*/tag(LoggerId);
export const FromConsole = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.succeedWith(() => ({
  serviceId: LoggerId,
  logLine: msg => T.succeedWith(() => {
    console.log(msg);
  })
})), TestLogger);
export const {
  logLine
} = /*#__PURE__*/T.deriveLifted(TestLogger)(["logLine"], [], []);
//# sourceMappingURL=index.mjs.map