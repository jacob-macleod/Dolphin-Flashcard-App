import type { URI } from "../../Prelude/index.js";
import * as P from "../../Prelude/index.js";
export declare type V = P.V<"R", "-"> & P.V<"E", "+">;
export declare const Any: P.Any<[URI<"Sync", {}>], V>;
export declare const Covariant: P.Covariant<[URI<"Sync", {}>], V>;
export declare const AssociativeBoth: P.AssociativeBoth<[URI<"Sync", {}>], V>;
export declare const AssociativeEither: P.AssociativeEither<[URI<"Sync", {}>], V>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Sync", {}>], V>;
export declare const Applicative: P.Applicative<[URI<"Sync", {}>], V>;
export declare const Access: P.FX.Access<[URI<"Sync", {}>], V>;
export declare const Fail: P.FX.Fail<[URI<"Sync", {}>], V>;
export declare const Run: P.FX.Run<[URI<"Sync", {}>], V>;
export declare const Provide: P.FX.Provide<[URI<"Sync", {}>], V>;
export declare const Monad: P.Monad<[URI<"Sync", {}>], V>;
//# sourceMappingURL=instances.d.ts.map