import { autoUpdate, safePolygon, useClick, useDismiss, useFloating, useHover, useInteractions, useRole, } from '@floating-ui/react';
import { getMiddleware, getPlacement } from '../components/Floating/helpers';
export const useBaseFLoating = ({ open, arrowRef, placement = 'top', setOpen, }) => {
    return useFloating({
        placement: getPlacement({ placement }),
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: getMiddleware({ placement, arrowRef }),
    });
};
export const useFloatingInteractions = ({ context, trigger, role = 'tooltip', interactions = [], }) => {
    return useInteractions([
        useClick(context, { enabled: trigger === 'click' }),
        useHover(context, {
            enabled: trigger === 'hover',
            handleClose: safePolygon(),
        }),
        useDismiss(context),
        useRole(context, { role }),
        ...interactions,
    ]);
};
