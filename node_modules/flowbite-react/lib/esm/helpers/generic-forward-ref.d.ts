import type React from 'react';
/** This allow the `forwardRef` to be used with generic components */
type FixedForwardRef = <T, P = {}>(render: (props: P, ref: React.Ref<T>) => JSX.Element) => (props: P & React.RefAttributes<T>) => JSX.Element;
declare const genericForwardRef: FixedForwardRef;
export default genericForwardRef;
