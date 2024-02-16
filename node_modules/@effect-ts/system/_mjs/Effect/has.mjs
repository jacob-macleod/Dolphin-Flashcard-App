// ets_tracing: off

/**
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import * as core from "../Effect/core.mjs";
import { mergeEnvironments } from "../Has/index.mjs";
import { accessCallTrace } from "../Tracing/index.mjs";
/**
 * Access a record of services with the required Service Entries
 */

export function accessServicesM(s) {
  return (f, __trace) => core.accessM(r => f(R.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a tuple of services with the required Service Entries monadically
 */

export function accessServicesTM(...s) {
  return (f, __trace) => core.accessM(r => f(...A.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a tuple of services with the required Service Entries
 */

export function accessServicesT(...s) {
  return (f, __trace) => core.access(r => f(...A.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a record of services with the required Service Entries
 */

export function accessServices(s) {
  return (f, __trace) => core.access(r => f(R.map_(s, v => r[v.key])), __trace);
}
/**
 * Access a service with the required Service Entry
 */

export function accessServiceM(s) {
  return (f, __trace) => core.accessM(r => f(r[s.key]), __trace);
}
/**
 * Access a service with the required Service Entry
 */

export function accessService(s) {
  return (f, __trace) => accessServiceM(s)(a => core.succeed(f(a)), __trace);
}
/**
 * Accesses the specified service in the environment of the effect.
 */

export function service(s, __trace) {
  return accessServiceM(s)(core.succeed, __trace);
}
/**
 * Accesses the specified services in the environment of the effect.
 *
 * @ets_trace call
 */

export function services(...s) {
  return core.access(r => s.map(tag => tag.read(r)), accessCallTrace());
}
/**
 * Provides the service with the required Service Entry
 */

export function provideServiceM(_) {
  return (service, __trace) => ma => core.accessM(r => core.chain_(service, t => core.provideAll_(ma, mergeEnvironments(_, r, t), __trace)));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideServiceM_(ma, _, service, __trace) {
  return core.accessM(r => core.chain_(service, t => core.provideAll_(ma, mergeEnvironments(_, r, t), __trace)));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideService(_) {
  return (service, __trace) => ma => provideServiceM(_)(core.succeed(service), __trace)(ma);
}
/**
 * Provides the service with the required Service Entry
 */

export function provideService_(ma, _, service, __trace) {
  return provideServiceM(_)(core.succeed(service), __trace)(ma);
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceServiceM(_, f, __trace) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t), __trace)(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceServiceM_(ma, _, f, __trace) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t), __trace)(ma));
}
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */

export function replaceService(_, f, __trace) {
  return ma => replaceService_(ma, _, f, __trace);
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceService_(ma, _, f, __trace) {
  return accessServiceM(_)(t => provideServiceM(_)(core.succeedWith(() => f(t)), __trace)(ma));
}
//# sourceMappingURL=has.mjs.map