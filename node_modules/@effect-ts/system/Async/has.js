"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessService = accessService;
exports.accessServiceM = accessServiceM;
exports.accessServices = accessServices;
exports.accessServicesM = accessServicesM;
exports.accessServicesT = accessServicesT;
exports.accessServicesTM = void 0;
exports.provideService = provideService;
exports.provideServiceM = provideServiceM;
exports.replaceService = replaceService;
exports.replaceServiceM = replaceServiceM;
exports.replaceServiceM_ = replaceServiceM_;
exports.replaceService_ = replaceService_;
exports.service = service;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Dictionary/index.js"));

var _index3 = /*#__PURE__*/require("../Has/index.js");

var As = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */

/**
 * Access a record of services with the required Service Entries
 */
function accessServicesM(s) {
  return f => As.accessM(r => f(R.map_(s, v => r[v.key])));
}

const accessServicesTM = (...s) => f => As.accessM(r => f(...A.map_(s, v => r[v.key])));

exports.accessServicesTM = accessServicesTM;

function accessServicesT(...s) {
  return f => As.access(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a record of services with the required Service Entries
 */


function accessServices(s) {
  return f => As.access(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a service with the required Service Entry
 */


function accessServiceM(s) {
  return f => As.accessM(r => f(r[s.key]));
}
/**
 * Access a service with the required Service Entry
 */


function accessService(s) {
  return f => accessServiceM(s)(a => As.succeed(f(a)));
}
/**
 * Access a service with the required Service Entry
 */


function service(s) {
  return accessServiceM(s)(a => As.succeed(a));
}
/**
 * Provides the service with the required Service Entry
 */


function provideServiceM(_) {
  return f => ma => As.accessM(r => As.chain_(f, t => As.provideAll_(ma, (0, _index3.mergeEnvironments)(_, r, t))));
}
/**
 * Provides the service with the required Service Entry
 */


function provideService(_) {
  return f => ma => provideServiceM(_)(As.succeed(f))(ma);
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceServiceM(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceServiceM_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceService(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(As.succeed(f(t)))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceService_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(As.succeed(f(t)))(ma));
}
//# sourceMappingURL=has.js.map