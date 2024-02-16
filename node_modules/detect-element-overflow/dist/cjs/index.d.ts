export default function detectElementOverflow(element: HTMLElement, container: HTMLElement): {
    readonly collidedTop: boolean;
    readonly collidedBottom: boolean;
    readonly collidedLeft: boolean;
    readonly collidedRight: boolean;
    readonly overflowTop: number;
    readonly overflowBottom: number;
    readonly overflowLeft: number;
    readonly overflowRight: number;
};
