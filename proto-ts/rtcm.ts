// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "rtcm.proto" (package "autoplt.rtk", syntax proto2)
// tslint:disable
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message autoplt.rtk.rtcm
 */
export interface rtcm {
    /**
     * @generated from protobuf field: int32 size = 1;
     */
    size: number;
    /**
     * @generated from protobuf field: repeated fixed32 content = 2;
     */
    content: number[];
}
// @generated message type with reflection information, may provide speed optimized methods
class rtcm$Type extends MessageType<rtcm> {
    constructor() {
        super("autoplt.rtk.rtcm", [
            { no: 1, name: "size", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "content", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 7 /*ScalarType.FIXED32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message autoplt.rtk.rtcm
 */
export const rtcm = new rtcm$Type();