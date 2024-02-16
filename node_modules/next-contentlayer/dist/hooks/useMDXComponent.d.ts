import type { MDXComponents } from 'mdx/types';
import React from 'react';
type MDXContentProps = {
    [props: string]: unknown;
    components?: MDXComponents;
};
export declare const getMDXComponent: (code: string, globals?: Record<string, unknown>) => React.FC<MDXContentProps>;
export declare const useMDXComponent: (code: string, globals?: Record<string, unknown>) => React.FC<MDXContentProps>;
export {};
//# sourceMappingURL=useMDXComponent.d.ts.map