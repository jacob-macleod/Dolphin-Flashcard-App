"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeEnvironments = mergeEnvironments;
exports.replaceServiceIn_ = exports.replaceServiceIn = void 0;
exports.service = service;
exports.tag = tag;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Option/index.js");

// ets_tracing: off
function service(x) {
  // @ts-expect-error
  return x;
}
/**
 * Extract the Has type from any augumented variant
 */


const makeTag = (key = Symbol()) => ({
  _tag: "Tag",
  _T: undefined,
  key,
  has: t => ({
    [key]: t
  }),
  of: t => t,
  read: r => r[key],
  readOption: r => typeof r === "object" && r !== null ? (0, _index2.fromNullable)(r[key]) : _index2.none,
  refine: () => makeTag(key)
});
/**
 * Create a service entry Tag from a type and a URI
 */


function tag(key) {
  return makeTag(key);
}
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */


const replaceServiceIn = (_, f) => r => ({ ...r,
  [_.key]: f(r[_.key])
});
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */


exports.replaceServiceIn = replaceServiceIn;

const replaceServiceIn_ = (r, _, f) => ({ ...r,
  ..._.has(f(r[_.key]))
});

exports.replaceServiceIn_ = replaceServiceIn_;

function mergeEnvironments(_, r, t) {
  return { ...r,
    ..._.has(t)
  };
}
//# sourceMappingURL=index.js.map