"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFloatingInteractions = exports.useBaseFLoating = void 0;
const react_1 = require("@floating-ui/react");
const helpers_1 = require("../components/Floating/helpers");
const useBaseFLoating = ({ open, arrowRef, placement = 'top', setOpen, }) => {
    return (0, react_1.useFloating)({
        placement: (0, helpers_1.getPlacement)({ placement }),
        open,
        onOpenChange: setOpen,
        whileElementsMounted: react_1.autoUpdate,
        middleware: (0, helpers_1.getMiddleware)({ placement, arrowRef }),
    });
};
exports.useBaseFLoating = useBaseFLoating;
const useFloatingInteractions = ({ context, trigger, role = 'tooltip', interactions = [], }) => {
    return (0, react_1.useInteractions)([
        (0, react_1.useClick)(context, { enabled: trigger === 'click' }),
        (0, react_1.useHover)(context, {
            enabled: trigger === 'hover',
            handleClose: (0, react_1.safePolygon)(),
        }),
        (0, react_1.useDismiss)(context),
        (0, react_1.useRole)(context, { role }),
        ...interactions,
    ]);
};
exports.useFloatingInteractions = useFloatingInteractions;
