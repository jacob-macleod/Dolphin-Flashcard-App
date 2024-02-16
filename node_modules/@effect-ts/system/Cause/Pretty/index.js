"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Failure = Failure;
exports.Parallel = Parallel;
exports.Sequential = Sequential;
exports.causeToSequential = causeToSequential;
exports.defaultErrorToLines = defaultErrorToLines;
exports.defaultRenderer = void 0;
exports.format = format;
exports.headTail = headTail;
exports.linearSegments = linearSegments;
exports.lines = lines;
exports.parallelSegments = parallelSegments;
exports.prefixBlock = prefixBlock;
exports.pretty = void 0;
exports.prettyLines = prettyLines;
exports.prettyM = prettyM;
exports.renderDie = renderDie;
exports.renderError = renderError;
exports.renderFail = renderFail;
exports.renderInterrupt = renderInterrupt;
exports.renderToString = renderToString;
exports.renderTrace = renderTrace;
exports.times = times;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Array/index.js"));

var _tracing = /*#__PURE__*/require("../../Fiber/tracing.js");

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../IO/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function Failure(lines) {
  return {
    _tag: "Failure",
    lines
  };
}

function Sequential(all) {
  return {
    _tag: "Sequential",
    all
  };
}

function Parallel(all) {
  return {
    _tag: "Parallel",
    all
  };
}

function headTail(a) {
  const x = [...a]; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  const head = x.shift();
  return [head, x];
}

function prefixBlock(values, p1, p2) {
  return A.isNonEmpty(values) ? (([head, tail]) => [`${p1}${head}`, ...tail.map(_ => `${p2}${_}`)])(headTail(values)) : [];
}

function renderInterrupt(fiberId, trace, traceRenderer) {
  return Sequential([Failure([`An interrupt was produced by #${fiberId.seqNumber}.`, "", ...renderTrace(trace, traceRenderer)])]);
}

function renderError(error) {
  return lines(error.stack ? error.stack : String(error));
}

function renderDie(error, trace, traceRenderer) {
  return Sequential([Failure(["An unchecked error was produced.", "", ...error, ...renderTrace(trace, traceRenderer)])]);
}

function renderFail(error, trace, traceRenderer) {
  return Sequential([Failure(["A checked error was not handled.", "", ...error, ...renderTrace(trace, traceRenderer)])]);
}

function lines(s) {
  return s.split("\n").map(s => s.replace("\r", ""));
}

function linearSegments(cause, renderer) {
  return S.gen(function* (_) {
    switch (cause._tag) {
      case "Then":
        {
          return [...(yield* _(linearSegments(cause.left, renderer))), ...(yield* _(linearSegments(cause.right, renderer)))];
        }

      default:
        {
          return (yield* _(causeToSequential(cause, renderer))).all;
        }
    }
  });
}

function parallelSegments(cause, renderer) {
  return S.gen(function* (_) {
    switch (cause._tag) {
      case "Both":
        {
          return [...(yield* _(parallelSegments(cause.left, renderer))), ...(yield* _(parallelSegments(cause.right, renderer)))];
        }

      default:
        {
          return [yield* _(causeToSequential(cause, renderer))];
        }
    }
  });
}

function renderToString(u) {
  if (typeof u === "object" && u != null && "toString" in u && typeof u["toString"] === "function" && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }

  return JSON.stringify(u, null, 2);
}

function causeToSequential(cause, renderer) {
  return S.gen(function* (_) {
    switch (cause._tag) {
      case "Empty":
        {
          return Sequential([]);
        }

      case "Fail":
        {
          return renderFail(renderer.renderError(cause.value), O.none, renderer.renderTrace);
        }

      case "Die":
        {
          return renderDie(renderer.renderUnknown(cause.value), O.none, renderer.renderTrace);
        }

      case "Interrupt":
        {
          return renderInterrupt(cause.fiberId, O.none, renderer.renderTrace);
        }

      case "Then":
        {
          return Sequential(yield* _(linearSegments(cause, renderer)));
        }

      case "Both":
        {
          return Sequential([Parallel(yield* _(parallelSegments(cause, renderer)))]);
        }

      case "Traced":
        {
          switch (cause.cause._tag) {
            case "Fail":
              {
                return renderFail(renderer.renderError(cause.cause.value), O.some(cause.trace), renderer.renderTrace);
              }

            case "Die":
              {
                return renderDie(renderer.renderUnknown(cause.cause.value), O.some(cause.trace), renderer.renderTrace);
              }

            case "Interrupt":
              {
                return renderInterrupt(cause.cause.fiberId, O.some(cause.trace), renderer.renderTrace);
              }

            default:
              {
                return Sequential([Failure(["An error was rethrown with a new trace.", ...renderTrace(O.some(cause.trace), renderer.renderTrace)]), ...(yield* _(causeToSequential(cause.cause, renderer))).all]);
              }
          }
        }
    }
  });
}

function renderTrace(o, renderTrace) {
  return o._tag === "None" ? [] : lines(renderTrace(o.value));
}

function times(s, n) {
  let h = "";

  for (let i = 0; i < n; i += 1) {
    h += s;
  }

  return h;
}

function format(segment) {
  switch (segment._tag) {
    case "Failure":
      {
        return prefixBlock(segment.lines, "─", " ");
      }

    case "Parallel":
      {
        return [times("══╦", segment.all.length - 1) + "══╗", ...A.reduceRight_(segment.all, [], (current, acc) => [...prefixBlock(acc, "  ║", "  ║"), ...prefixBlock(format(current), "  ", "  ")])];
      }

    case "Sequential":
      {
        return A.chain_(segment.all, seg => ["║", ...prefixBlock(format(seg), "╠", "║"), "▼"]);
      }
  }
}

function prettyLines(cause, renderer) {
  return S.gen(function* (_) {
    const s = yield* _(causeToSequential(cause, renderer));

    if (s.all.length === 1 && s.all[0] && s.all[0]._tag === "Failure") {
      return s.all[0].lines;
    }

    return O.getOrElse_(A.updateAt_(format(s), 0, "╥"), () => []);
  });
}

function prettyM(cause, renderer) {
  return S.gen(function* (_) {
    const lines = yield* _(prettyLines(cause, renderer));
    return `\n${lines.join("\n")}`;
  });
}

function defaultErrorToLines(error) {
  return error instanceof Error ? renderError(error) : lines(renderToString(error));
}

const defaultRenderer = {
  renderError: defaultErrorToLines,
  renderTrace: _tracing.prettyTrace,
  renderUnknown: defaultErrorToLines
};
/**
 * Returns a `String` with the cause pretty-printed.
 */

exports.defaultRenderer = defaultRenderer;

const pretty = (cause, renderer = defaultRenderer) => S.run(prettyM(cause, renderer));

exports.pretty = pretty;
//# sourceMappingURL=index.js.map