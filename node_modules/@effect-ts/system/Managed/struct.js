"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindAll = bindAll;
exports.bindAllPar = bindAllPar;
exports.bindAllParN = bindAllParN;
exports.bindAllParN_ = bindAllParN_;
exports.bindAllPar_ = bindAllPar_;
exports.bindAll_ = bindAll_;
exports.struct = struct;
exports.structPar = structPar;
exports.structParN = structParN;
exports.structParN_ = structParN_;

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Dictionary/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _forEach = /*#__PURE__*/require("./forEach.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function struct(r, __trace) {
  return (0, _core.map_)((0, _forEach.forEach_)(R.collect_(r, (k, v) => [k, v]), ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}

function structPar(r, __trace) {
  return (0, _core.map_)((0, _forEach.forEachPar_)(R.collect_(r, (k, v) => [k, v]), ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * @ets_data_first structParN_
 */


function structParN(n, __trace) {
  // @ts-expect-error
  return r => structParN_(r, n, __trace);
}

function structParN_(r, n, __trace) {
  return (0, _core.map_)((0, _forEach.forEachParN_)(R.collect_(r, (k, v) => [k, v]), n, ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * @ets_data_first bindAll_
 */


function bindAll(r, __trace) {
  // @ts-expect-error
  return s => bindAll_(s, r, __trace);
}

function bindAll_(s, r, __trace) {
  return (0, _core.chain_)(s, k => (0, _core.map_)((0, _forEach.forEach_)(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
/**
 * @ets_data_first bindAllPar_
 */


function bindAllPar(r, __trace) {
  // @ts-expect-error
  return s => bindAllPar_(s, r, __trace);
}

function bindAllPar_(s, r, __trace) {
  return (0, _core.chain_)(s, k => (0, _core.map_)((0, _forEach.forEachPar_)(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
/**
 * @ets_data_first bindAllParN_
 */


function bindAllParN(n, r, __trace) {
  // @ts-expect-error
  return s => bindAllParN_(s, n, r, __trace);
}

function bindAllParN_(s, n, r, __trace) {
  return (0, _core.chain_)(s, k => (0, _core.map_)((0, _forEach.forEachParN_)(R.collect_(r(k), (k, v) => [k, v]), n, ([_, e]) => (0, _core.map_)(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
//# sourceMappingURL=struct.js.map