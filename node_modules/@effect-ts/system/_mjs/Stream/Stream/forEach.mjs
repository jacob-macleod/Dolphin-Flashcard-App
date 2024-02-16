import * as SK from "../Sink/index.mjs";
import { run_ } from "./run.mjs";
import { runManaged_ } from "./runManaged.mjs";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function forEach_(self, f) {
  return run_(self, SK.forEach(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function forEach(f) {
  return self => forEach_(self, f);
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachWhileManaged_(self, f) {
  return runManaged_(self, SK.forEachWhile(f));
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachWhileManaged(f) {
  return self => forEachWhileManaged_(self, f);
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function forEachChunk_(self, f) {
  return run_(self, SK.forEachChunk(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function forEachChunk(f) {
  return self => run_(self, SK.forEachChunk(f));
}
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */

export function forEachWhile_(self, f) {
  return run_(self, SK.forEachWhile(f));
}
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */

export function forEachWhile(f) {
  return self => forEachWhile_(self, f);
}
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachManaged_(self, f) {
  return runManaged_(self, SK.forEach(f));
}
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachManaged(f) {
  return self => forEachManaged_(self, f);
}
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachChunkManaged_(self, f) {
  return runManaged_(self, SK.forEachChunk(f));
}
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */

export function forEachChunkManaged(f) {
  return self => forEachChunkManaged_(self, f);
}
//# sourceMappingURL=forEach.mjs.map