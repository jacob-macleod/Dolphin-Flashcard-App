"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trace = exports.SourceLocation = exports.NoLocation = void 0;
exports.ancestryLength = ancestryLength;
exports.ancestryLengthSafe = ancestryLengthSafe;
exports.parents = parents;
exports.prettyTrace = prettyTrace;
exports.prettyTraceSafe = prettyTraceSafe;
exports.traceLocation = traceLocation;
exports.truncatedParentTrace = truncatedParentTrace;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/core.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Sync/index.js"));

var _id = /*#__PURE__*/require("./id.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class NoLocation {
  constructor() {
    this._tag = "NoLocation";
  }

}

exports.NoLocation = NoLocation;

class SourceLocation {
  constructor(location) {
    this.location = location;
    this._tag = "SourceLocation";
  }

}

exports.SourceLocation = SourceLocation;

function traceLocation(k) {
  if (k) {
    return new SourceLocation(k);
  }

  return new NoLocation();
}

class Trace {
  constructor(fiberId, executionTrace, stackTrace, parentTrace) {
    this.fiberId = fiberId;
    this.executionTrace = executionTrace;
    this.stackTrace = stackTrace;
    this.parentTrace = parentTrace;
  }

}

exports.Trace = Trace;

function ancestryLengthSafe(trace, i) {
  const parent = trace.parentTrace;

  if (parent._tag === "None") {
    return S.succeed(i);
  } else {
    return S.suspend(() => ancestryLengthSafe(parent.value, i + 1));
  }
}

function ancestryLength(trace) {
  return S.run(ancestryLengthSafe(trace, 0));
}

function parents(trace) {
  const pushable = L.emptyPushable();
  let parent = O.toUndefined(trace.parentTrace);

  while (parent != null) {
    L.push_(pushable, parent);
    parent = O.toUndefined(parent.parentTrace);
  }

  return pushable;
}

function truncatedParentTrace(trace, maxAncestors) {
  if (ancestryLength(trace) > maxAncestors) {
    return L.reduceRight_(L.take_(parents(trace), maxAncestors), O.none, (trace, parent) => O.some(new Trace(trace.fiberId, trace.executionTrace, trace.stackTrace, parent)));
  } else {
    return trace.parentTrace;
  }
}

function prettyTrace(trace) {
  return S.run(prettyTraceSafe(trace));
}

function prettyTraceSafe(trace) {
  return S.gen(function* ($) {
    const execution = L.filter_(trace.executionTrace, _ => _._tag === "SourceLocation");
    const stack = L.filter_(trace.stackTrace, _ => _._tag === "SourceLocation");
    const execTrace = !L.isEmpty(execution);
    const stackTrace = !L.isEmpty(stack);
    const execPrint = execTrace ? [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} Execution trace:`, "", ...L.toArray(L.map_(execution, a => `  ${a.location}`))] : [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} Execution trace: <empty trace>`];
    const stackPrint = stackTrace ? [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} was supposed to continue to:`, "", ...L.toArray(L.map_(stack, e => `  a future continuation at ${e.location}`))] : [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} was supposed to continue to: <empty trace>`];
    const parent = trace.parentTrace;
    const ancestry = parent._tag === "None" ? [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} was spawned by: <empty trace>`] : [`Fiber: ${(0, _id.prettyFiberId)(trace.fiberId)} was spawned by:`, yield* $(prettyTraceSafe(parent.value))];
    return ["", ...stackPrint, "", ...execPrint, "", ...ancestry].join("\n");
  });
}
//# sourceMappingURL=tracing.js.map