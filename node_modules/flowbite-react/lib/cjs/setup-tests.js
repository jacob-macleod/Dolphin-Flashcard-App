"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom/vitest");
const react_1 = require("@testing-library/react");
const resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
const vitest_1 = require("vitest");
(0, vitest_1.afterEach)(() => (0, react_1.cleanup)());
// eslint-disable-next-line no-undef
global.ResizeObserver = resize_observer_polyfill_1.default;
