"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessService = accessService;
exports.accessServiceM = accessServiceM;
exports.accessServices = accessServices;
exports.accessServicesM = accessServicesM;
exports.accessServicesT = accessServicesT;
exports.accessServicesTM = accessServicesTM;
exports.provideService = provideService;
exports.provideServiceM = provideServiceM;
exports.provideServiceM_ = provideServiceM_;
exports.provideService_ = provideService_;
exports.replaceService = replaceService;
exports.replaceServiceM = replaceServiceM;
exports.replaceServiceM_ = replaceServiceM_;
exports.replaceService_ = replaceService_;
exports.service = service;
exports.services = services;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Dictionary/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/core.js"));

var _index3 = /*#__PURE__*/require("../Has/index.js");

var _index4 = /*#__PURE__*/require("../Tracing/index.js");

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
  return (f, __trace) => core.accessM(r => f(R.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a tuple of services with the required Service Entries monadically
 */


function accessServicesTM(...s) {
  return (f, __trace) => core.accessM(r => f(...A.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a tuple of services with the required Service Entries
 */


function accessServicesT(...s) {
  return (f, __trace) => core.access(r => f(...A.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a record of services with the required Service Entries
 */


function accessServices(s) {
  return (f, __trace) => core.access(r => f(R.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a service with the required Service Entry
 */


function accessServiceM(s) {
  return (f, __trace) => core.accessM(r => f(r[s.key]), __trace);
}
/**
 * Access a service with the required Service Entry
 */


function accessService(s) {
  return (f, __trace) => accessServiceM(s)(a => core.succeed(f(a)), __trace);
}
/**
 * Accesses the specified service in the environment of the effect.
 */


function service(s, __trace) {
  return accessServiceM(s)(core.succeed, __trace);
}
/**
 * Accesses the specified services in the environment of the effect.
 *
 * @ets_trace call
 */


function services(...s) {
  return core.access(r => s.map(tag => tag.read(r)), (0, _index4.accessCallTrace)());
}
/**
 * Provides the service with the required Service Entry
 */


function provideServiceM(_) {
  return (service, __trace) => ma => core.accessM(r => core.chain_(service, t => core.provideAll_(ma, (0, _index3.mergeEnvironments)(_, r, t), __trace)));
}
/**
 * Provides the service with the required Service Entry
 */


function provideServiceM_(ma, _, service, __trace) {
  return core.accessM(r => core.chain_(service, t => core.provideAll_(ma, (0, _index3.mergeEnvironments)(_, r, t), __trace)));
}
/**
 * Provides the service with the required Service Entry
 */


function provideService(_) {
  return (service, __trace) => ma => provideServiceM(_)(core.succeed(service), __trace)(ma);
}
/**
 * Provides the service with the required Service Entry
 */


function provideService_(ma, _, service, __trace) {
  return provideServiceM(_)(core.succeed(service), __trace)(ma);
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceServiceM(_, f, __trace) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t), __trace)(ma));
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceServiceM_(ma, _, f, __trace) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t), __trace)(ma));
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */


function replaceService(_, f, __trace) {
  return ma => replaceService_(ma, _, f, __trace);
}
/**
 * Replaces the service with the required Service Entry
 */


function replaceService_(ma, _, f, __trace) {
  return accessServiceM(_)(t => provideServiceM(_)(core.succeedWith(() => f(t)), __trace)(ma));
}
//# sourceMappingURL=has.js.map