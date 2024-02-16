"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = void 0;
const isClient = () => {
    return typeof window !== 'undefined';
};
exports.isClient = isClient;
