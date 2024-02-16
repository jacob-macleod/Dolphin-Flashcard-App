// ets_tracing: off
import * as A from "../../Collections/Immutable/Array/index.mjs";
import { prettyTrace } from "../../Fiber/tracing.mjs";
import { pipe } from "../../Function/index.mjs";
import * as S from "../../IO/index.mjs";
import * as O from "../../Option/index.mjs";
export function Failure(lines) {
  return {
    _tag: "Failure",
    lines
  };
}
export function Sequential(all) {
  return {
    _tag: "Sequential",
    all
  };
}
export function Parallel(all) {
  return {
    _tag: "Parallel",
    all
  };
}
export function headTail(a) {
  const x = [...a]; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  const head = x.shift();
  return [head, x];
}
export function prefixBlock(values, p1, p2) {
  return A.isNonEmpty(values) ? (([head, tail]) => [`${p1}${head}`, ...tail.map(_ => `${p2}${_}`)])(headTail(values)) : [];
}
export function renderInterrupt(fiberId, trace, traceRenderer) {
  return Sequential([Failure([`An interrupt was produced by #${fiberId.seqNumber}.`, "", ...renderTrace(trace, traceRenderer)])]);
}
export function renderError(error) {
  return lines(error.stack ? error.stack : String(error));
}
export function renderDie(error, trace, traceRenderer) {
  return Sequential([Failure(["An unchecked error was produced.", "", ...error, ...renderTrace(trace, traceRenderer)])]);
}
export function renderFail(error, trace, traceRenderer) {
  return Sequential([Failure(["A checked error was not handled.", "", ...error, ...renderTrace(trace, traceRenderer)])]);
}
export function lines(s) {
  return s.split("\n").map(s => s.replace("\r", ""));
}
export function linearSegments(cause, renderer) {
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
export function parallelSegments(cause, renderer) {
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
export function renderToString(u) {
  if (typeof u === "object" && u != null && "toString" in u && typeof u["toString"] === "function" && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }

  return JSON.stringify(u, null, 2);
}
export function causeToSequential(cause, renderer) {
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
export function renderTrace(o, renderTrace) {
  return o._tag === "None" ? [] : lines(renderTrace(o.value));
}
export function times(s, n) {
  let h = "";

  for (let i = 0; i < n; i += 1) {
    h += s;
  }

  return h;
}
export function format(segment) {
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
export function prettyLines(cause, renderer) {
  return S.gen(function* (_) {
    const s = yield* _(causeToSequential(cause, renderer));

    if (s.all.length === 1 && s.all[0] && s.all[0]._tag === "Failure") {
      return s.all[0].lines;
    }

    return O.getOrElse_(A.updateAt_(format(s), 0, "╥"), () => []);
  });
}
export function prettyM(cause, renderer) {
  return S.gen(function* (_) {
    const lines = yield* _(prettyLines(cause, renderer));
    return `\n${lines.join("\n")}`;
  });
}
export function defaultErrorToLines(error) {
  return error instanceof Error ? renderError(error) : lines(renderToString(error));
}
export const defaultRenderer = {
  renderError: defaultErrorToLines,
  renderTrace: prettyTrace,
  renderUnknown: defaultErrorToLines
};
/**
 * Returns a `String` with the cause pretty-printed.
 */

export const pretty = (cause, renderer = defaultRenderer) => S.run(prettyM(cause, renderer));
//# sourceMappingURL=index.mjs.map