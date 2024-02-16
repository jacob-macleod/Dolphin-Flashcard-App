import * as List from "../../Collections/Immutable/List/index.js";
import type { TestAnnotationMap } from "../TestAnnotationMap/index.js";
export interface TestAnnotationRenderer {
    readonly run: (ancestors: List.List<TestAnnotationMap>, child: TestAnnotationMap) => List.List<string>;
}
export declare class CompositeRenderer implements TestAnnotationRenderer {
    readonly renderers: List.List<TestAnnotationRenderer>;
    constructor(_: readonly TestAnnotationRenderer[]);
    readonly run: (ancestors: List.List<TestAnnotationMap>, child: TestAnnotationMap) => List.List<string>;
}
export declare const standard: TestAnnotationRenderer;
//# sourceMappingURL=index.d.ts.map