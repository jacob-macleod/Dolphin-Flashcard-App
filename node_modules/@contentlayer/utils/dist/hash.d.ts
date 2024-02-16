import type { JsonValue } from 'type-fest';
import { T } from './effect/index.js';
export declare const hashObject: (obj: JsonValue | any) => T.Effect<unknown, HashError, string>;
declare const HashError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"HashError", "_tag">;
export declare class HashError extends HashError_base<{
    readonly error: unknown;
}> {
}
export {};
//# sourceMappingURL=hash.d.ts.map