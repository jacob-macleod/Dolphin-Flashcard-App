"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectTraces = collectTraces;
exports.dump = dump;
exports.dumpFibers = dumpFibers;
exports.dumpStr = dumpStr;
exports.prettyPrint = prettyPrint;
exports.prettyPrintM = prettyPrintM;
exports.renderHierarchy = renderHierarchy;
exports.renderOne = renderOne;
exports.renderStatus = renderStatus;

var _index = /*#__PURE__*/require("../Function/index.js");

var IT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var _index3 = /*#__PURE__*/require("../Option/index.js");

var _parseMs = /*#__PURE__*/require("../Utils/parse-ms.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/effect-api.js"));

var _dump = /*#__PURE__*/require("./dump.js");

var _fiberName = /*#__PURE__*/require("./fiberName.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function dump(fiber) {
  return T.map_(T.zipPar_(fiber.getRef(_fiberName.fiberName), fiber.status), ({
    tuple: [name, status]
  }) => (0, _dump.FiberDump)(fiber.id, name, status));
}

function dumpFibers(fibers) {
  return T.forEach_(fibers, dump);
}

function dumpStr(fibers, withTrace) {
  const du = T.forEach_(fibers, dump);
  const now = T.succeedWith(() => new Date().getTime());
  return T.map_(T.zipWith_(du, now, _index.tuple), ([dumps, now]) => {
    const tree = renderHierarchy(dumps);
    const dumpStrings = withTrace ? collectTraces(dumps, now) : [];
    return IT.reduce_(dumpStrings, tree, (acc, v) => acc + "\n" + v);
  });
}

function prettyPrintM(dump) {
  return T.succeed(prettyPrint(dump, new Date().getTime()));
}
/**
 * @internal
 */


function prettyPrint(dump, now) {
  const {
    days,
    hours,
    milliseconds,
    minutes,
    seconds
  } = (0, _parseMs.parseMs)(now - dump.fiberId.startTimeMillis);
  const name = (0, _index3.fold_)(dump.fiberName, (0, _index.constant)(""), n => `"${n}" `);
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


function renderOne(tree) {
  const prefix = "";
  const name = (0, _index3.fold_)(tree.fiberName, (0, _index.constant)(""), n => '"' + n + '" ');
  const statusMsg = renderStatus(tree.status);
  return `${prefix}+---${name}#${tree.fiberId.seqNumber} Status: ${statusMsg}\n`;
}
/**
 * @internal
 */


function renderStatus(status) {
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


function renderHierarchy(trees) {
  return IT.reduce_(IT.map_(trees, renderOne), "", (acc, str) => acc + str);
}

function collectTraces(dumps, now) {
  return IT.map_(dumps, d => prettyPrint(d, now));
}
//# sourceMappingURL=fiberRenderer.js.map