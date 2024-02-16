"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBase = void 0;
const react_1 = require("react");
const generic_forward_ref_1 = __importDefault(require("../../helpers/generic-forward-ref"));
const ButtonBaseComponent = ({ children, as: Component, href, type = 'button', ...props }, ref) => {
    const BaseComponent = Component || (href ? 'a' : 'button');
    return (0, react_1.createElement)(BaseComponent, { ref, href, type, ...props }, children);
};
exports.ButtonBase = (0, generic_forward_ref_1.default)(ButtonBaseComponent);
