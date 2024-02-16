// NOTE use ESM/CommonJS compat import here until resolved: https://github.com/facebook/react/issues/11503
import React from 'react';
// NOTE use ESM/CommonJS compat import here until resolved: https://github.com/facebook/react/issues/11503
import ReactDOM from 'react-dom';
// @ts-expect-error React version workaround (This CJS workaround can be removed once Contentlayer is only targeting React 18+)
import { _jsx_runtime } from './jsx-runtime.cjs';
export const getMDXComponent = (code, globals = {}) => {
    const scope = { React, ReactDOM, _jsx_runtime, ...globals };
    const fn = new Function(...Object.keys(scope), code);
    return fn(...Object.values(scope)).default;
};
export const useMDXComponent = (code, globals = {}) => {
    return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
};
//# sourceMappingURL=useMDXComponent.js.map