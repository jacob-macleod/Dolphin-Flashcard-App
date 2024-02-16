import { constant, tuple } from "../Function/index.mjs";
import * as IT from "../Iterable/index.mjs";
import { fold_ } from "../Option/index.mjs";
import { parseMs } from "../Utils/parse-ms.mjs";
import * as T from "./_internal/effect-api.mjs";
import { FiberDump } from "./dump.mjs";
import { fiberName } from "./fiberName.mjs";
export function dump(fiber) {
  return T.map_(T.zipPar_(fiber.getRef(fiberName), fiber.status), ({
    tuple: [name, status]
  }) => FiberDump(fiber.id, name, status));
}
export function dumpFibers(fibers) {
  return T.forEach_(fibers, dump);
}
export function dumpStr(fibers, withTrace) {
  const du = T.forEach_(fibers, dump);
  const now = T.succeedWith(() => new Date().getTime());
  return T.map_(T.zipWith_(du, now, tuple), ([dumps, now]) => {
    const tree = renderHierarchy(dumps);
    const dumpStrings = withTrace ? collectTraces(dumps, now) : [];
    return IT.reduce_(dumpStrings, tree, (acc, v) => acc + "\n" + v);
  });
}
export function prettyPrintM(dump) {
  return T.succeed(prettyPrint(dump, new Date().getTime()));
}
/**
 * @internal
 */

export function prettyPrint(dump, now) {
  const {
    days,
    hours,
    milliseconds,
    minutes,
    seconds
  } = parseMs(now - dump.fiberId.startTimeMillis);
  const name = fold_(dump.fiberName, constant(""), n => `"${n}" `);
  const lifeMsg = (days === 0 ? "" : `${days}d`) + (days === 0 && hours === 0 ? "" : `${hours}h`) + (days === 0 && hours === 0 && minutes === 0 ? "" : `${minutes}m`) + (days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? "" : `${seconds}s`) + `${milliseconds}ms`;

  const waitMsg = function (status) {
    switch (status._tag) {
      case "Suspended":
        return status.blockingOn.length > 0 ? `waiting on ` + status.blockingOn.map(id => `${id.seqNumber}`).join(", ") : "";

      default:
        return "";
    }
  }(dump.status);

  const statMsg = renderStatus(dump.status);
  return [`${name}#${dump.fiberId.seqNumber} (${lifeMsg}) ${waitMsg}`, `   Status: ${statMsg}`].join("\n");
}
/**
 * @internal
 */

export function renderOne(tree) {
  const prefix = "";
  const name = fold_(tree.fiberName, constant(""), n => '"' + n + '" ');
  const statusMsg = renderStatus(tree.status);
  return `${prefix}+---${name}#${tree.fiberId.seqNumber} Status: ${statusMsg}\n`;
}
/**
 * @internal
 */

export function renderStatus(status) {
  switch (status._tag) {
    case "Done":
      return "Done";

    case "Finishing":
      return `Finishing(${status.interrupting ? "interrupting" : ""})`;

    case "Running":
      return `Running(${status.interrupting ? "interrupting" : ""})`;

    case "Suspended":
      {
        const inter = status.interruptible ? "interruptible" : "uninterruptible";
        const ep = `${status.epoch} asyncs`;
        return `Suspended(${inter}, ${ep})`;
      }
  }
}
/**
 * @internal
 */

export function renderHierarchy(trees) {
  return IT.reduce_(IT.map_(trees, renderOne), "", (acc, str) => acc + str);
}
export function collectTraces(dumps, now) {
  return IT.map_(dumps, d => prettyPrint(d, now));
}
//# sourceMappingURL=fiberRenderer.mjs.map