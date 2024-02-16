export declare const SinkEndReasonTypeId: unique symbol;
export declare const SinkEndTypeId: unique symbol;
export declare class SinkEnd {
    readonly _sinkEndReasonTypeId: typeof SinkEndReasonTypeId;
    readonly _typeId: typeof SinkEndTypeId;
}
export declare const ScheduleTimeoutTypeId: unique symbol;
export declare class ScheduleTimeout {
    readonly _sinkEndReasonTypeId: typeof SinkEndReasonTypeId;
    readonly _typeId: typeof ScheduleTimeoutTypeId;
}
export declare const ScheduleEndTypeId: unique symbol;
export declare class ScheduleEnd<C> {
    readonly c: C;
    readonly _sinkEndReasonTypeId: typeof SinkEndReasonTypeId;
    readonly _typeId: typeof ScheduleEndTypeId;
    constructor(c: C);
}
export declare const UpstreamEndTypeId: unique symbol;
export declare class UpstreamEnd {
    readonly _sinkEndReasonTypeId: typeof SinkEndReasonTypeId;
    readonly _typeId: typeof UpstreamEndTypeId;
}
export declare type SinkEndReason<C> = SinkEnd | ScheduleTimeout | ScheduleEnd<C> | UpstreamEnd;
//# sourceMappingURL=SinkEndReason.d.ts.map