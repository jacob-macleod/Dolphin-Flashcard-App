import { logLine } from "../TestLogger/index.mjs";
export function DefaultTestReporter(_) {
  return (d, s) => logLine(`duration: ${d}\n${JSON.stringify(s)}`);
}
//# sourceMappingURL=index.mjs.map