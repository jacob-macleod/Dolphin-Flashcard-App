// ets_tracing: off

/**
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { mergeEnvironments } from "../Has/index.mjs";
import * as As from "./core.mjs";
/**
 * Access a record of services with the required Service Entries
 */

export function accessServicesM(s) {
  return f => As.accessM(r => f(R.map_(s, v => r[v.key])));
}
export const accessServicesTM = (...s) => f => As.accessM(r => f(...A.map_(s, v => r[v.key])));
export function accessServicesT(...s) {
  return f => As.access(r => f(...A.map_(s, v => r[v.key])));
}
/**
 * Access a record of services with the required Service Entries
 */

export function accessServices(s) {
  return f => As.access(r => f(R.map_(s, v => r[v.key])));
}
/**
 * Access a service with the required Service Entry
 */

export function accessServiceM(s) {
  return f => As.accessM(r => f(r[s.key]));
}
/**
 * Access a service with the required Service Entry
 */

export function accessService(s) {
  return f => accessServiceM(s)(a => As.succeed(f(a)));
}
/**
 * Access a service with the required Service Entry
 */

export function service(s) {
  return accessServiceM(s)(a => As.succeed(a));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideServiceM(_) {
  return f => ma => As.accessM(r => As.chain_(f, t => As.provideAll_(ma, mergeEnvironments(_, r, t))));
}
/**
 * Provides the service with the required Service Entry
 */

export function provideService(_) {
  return f => ma => provideServiceM(_)(As.succeed(f))(ma);
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceServiceM(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceServiceM_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(f(t))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceService(_, f) {
  return ma => accessServiceM(_)(t => provideServiceM(_)(As.succeed(f(t)))(ma));
}
/**
 * Replaces the service with the required Service Entry
 */

export function replaceService_(ma, _, f) {
  return accessServiceM(_)(t => provideServiceM(_)(As.succeed(f(t)))(ma));
}
//# sourceMappingURL=has.mjs.map