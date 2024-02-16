import * as HashMap from "../../Collections/Immutable/HashMap/index.js";
import type { Endomorphism } from "../../Function/index.js";
import type * as TestAnnotation from "../TestAnnotation/index.js";
export declare class TestAnnotationMap {
    readonly map: HashMap.HashMap<TestAnnotation.TestAnnotation<unknown>, unknown>;
    static empty: TestAnnotationMap;
    constructor(map: HashMap.HashMap<TestAnnotation.TestAnnotation<unknown>, unknown>);
}
export declare function concat(self: TestAnnotationMap, that: TestAnnotationMap): TestAnnotationMap;
export declare function get<V>(key: TestAnnotation.TestAnnotation<V>): (tam: TestAnnotationMap) => V;
export declare function overwrite<V>(key: TestAnnotation.TestAnnotation<V>, value: V): (tam: TestAnnotationMap) => TestAnnotationMap;
export declare function update<V>(key: TestAnnotation.TestAnnotation<V>, f: Endomorphism<V>): (tam: TestAnnotationMap) => TestAnnotationMap;
export declare function annotate<V>(key: TestAnnotation.TestAnnotation<V>, value: V): (tam: TestAnnotationMap) => TestAnnotationMap;
//# sourceMappingURL=index.d.ts.map