"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrowPlacement = exports.getPlacement = exports.getMiddleware = void 0;
const react_1 = require("@floating-ui/react");
/**
 * @see https://floating-ui.com/docs/middleware
 */
const getMiddleware = ({ arrowRef, placement, }) => {
    const middleware = [];
    middleware.push((0, react_1.offset)(8));
    middleware.push(placement === 'auto' ? (0, react_1.autoPlacement)() : (0, react_1.flip)());
    middleware.push((0, react_1.shift)({ padding: 8 }));
    if (arrowRef?.current) {
        middleware.push((0, react_1.arrow)({ element: arrowRef.current }));
    }
    return middleware;
};
exports.getMiddleware = getMiddleware;
const getPlacement = ({ placement }) => {
    return placement === 'auto' ? undefined : placement;
};
exports.getPlacement = getPlacement;
const getArrowPlacement = ({ placement }) => {
    return {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[placement.split('-')[0]];
};
exports.getArrowPlacement = getArrowPlacement;
