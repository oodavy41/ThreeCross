// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "transform_conf.proto" (package "autoplt.transform", syntax proto2)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message autoplt.transform.ExtrinsicFile
 */
export interface ExtrinsicFile {
    /**
     * @generated from protobuf field: optional string frame_id = 1;
     */
    frameId?: string;
    /**
     * @generated from protobuf field: optional string child_frame_id = 2;
     */
    childFrameId?: string;
    /**
     * @generated from protobuf field: optional string file_path = 3;
     */
    filePath?: string;
    /**
     * @generated from protobuf field: optional bool enable = 4;
     */
    enable?: boolean;
}
/**
 * @generated from protobuf message autoplt.transform.GlobalConf
 */
export interface GlobalConf {
    /**
     * @generated from protobuf field: string global_coordinate_tf_frame_id = 1;
     */
    globalCoordinateTfFrameId: string;
    /**
     * @generated from protobuf field: string global_coordinate_tf_child_frame_id = 2;
     */
    globalCoordinateTfChildFrameId: string;
    /**
     * @generated from protobuf field: repeated autoplt.transform.ExtrinsicFile extrinsic_file = 3;
     */
    extrinsicFile: ExtrinsicFile[];
    /**
     * @generated from protobuf field: autoplt.transform.WorkMode work_mode = 4;
     */
    workMode: WorkMode;
    /**
     * rtk mode
     *
     * @generated from protobuf field: optional int32 utm_zone = 5;
     */
    utmZone?: number;
    /**
     * @generated from protobuf field: optional bool rtk_record = 6;
     */
    rtkRecord?: boolean;
    /**
     * @generated from protobuf field: optional string record_path = 7;
     */
    recordPath?: string;
    /**
     * static pose mode
     *
     * @generated from protobuf field: optional string pose_output_path = 8;
     */
    poseOutputPath?: string;
}
/**
 * @generated from protobuf enum autoplt.transform.WorkMode
 */
export enum WorkMode {
    /**
     * @generated from protobuf enum value: rtk_mode = 0;
     */
    rtk_mode = 0,
    /**
     * @generated from protobuf enum value: static_pose_mode = 1;
     */
    static_pose_mode = 1
}
// @generated message type with reflection information, may provide speed optimized methods
class ExtrinsicFile$Type extends MessageType<ExtrinsicFile> {
    constructor() {
        super("autoplt.transform.ExtrinsicFile", [
            { no: 1, name: "frame_id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "child_frame_id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "file_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "enable", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<ExtrinsicFile>): ExtrinsicFile {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ExtrinsicFile>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ExtrinsicFile): ExtrinsicFile {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string frame_id */ 1:
                    message.frameId = reader.string();
                    break;
                case /* optional string child_frame_id */ 2:
                    message.childFrameId = reader.string();
                    break;
                case /* optional string file_path */ 3:
                    message.filePath = reader.string();
                    break;
                case /* optional bool enable */ 4:
                    message.enable = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ExtrinsicFile, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string frame_id = 1; */
        if (message.frameId !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.frameId);
        /* optional string child_frame_id = 2; */
        if (message.childFrameId !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.childFrameId);
        /* optional string file_path = 3; */
        if (message.filePath !== undefined)
            writer.tag(3, WireType.LengthDelimited).string(message.filePath);
        /* optional bool enable = 4; */
        if (message.enable !== undefined)
            writer.tag(4, WireType.Varint).bool(message.enable);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.transform.ExtrinsicFile
 */
export const ExtrinsicFile = new ExtrinsicFile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GlobalConf$Type extends MessageType<GlobalConf> {
    constructor() {
        super("autoplt.transform.GlobalConf", [
            { no: 1, name: "global_coordinate_tf_frame_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "global_coordinate_tf_child_frame_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "extrinsic_file", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => ExtrinsicFile },
            { no: 4, name: "work_mode", kind: "enum", T: () => ["autoplt.transform.WorkMode", WorkMode] },
            { no: 5, name: "utm_zone", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "rtk_record", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "record_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "pose_output_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GlobalConf>): GlobalConf {
        const message = { globalCoordinateTfFrameId: "", globalCoordinateTfChildFrameId: "", extrinsicFile: [], workMode: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GlobalConf>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GlobalConf): GlobalConf {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string global_coordinate_tf_frame_id */ 1:
                    message.globalCoordinateTfFrameId = reader.string();
                    break;
                case /* string global_coordinate_tf_child_frame_id */ 2:
                    message.globalCoordinateTfChildFrameId = reader.string();
                    break;
                case /* repeated autoplt.transform.ExtrinsicFile extrinsic_file */ 3:
                    message.extrinsicFile.push(ExtrinsicFile.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* autoplt.transform.WorkMode work_mode */ 4:
                    message.workMode = reader.int32();
                    break;
                case /* optional int32 utm_zone */ 5:
                    message.utmZone = reader.int32();
                    break;
                case /* optional bool rtk_record */ 6:
                    message.rtkRecord = reader.bool();
                    break;
                case /* optional string record_path */ 7:
                    message.recordPath = reader.string();
                    break;
                case /* optional string pose_output_path */ 8:
                    message.poseOutputPath = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GlobalConf, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string global_coordinate_tf_frame_id = 1; */
        if (message.globalCoordinateTfFrameId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.globalCoordinateTfFrameId);
        /* string global_coordinate_tf_child_frame_id = 2; */
        if (message.globalCoordinateTfChildFrameId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.globalCoordinateTfChildFrameId);
        /* repeated autoplt.transform.ExtrinsicFile extrinsic_file = 3; */
        for (let i = 0; i < message.extrinsicFile.length; i++)
            ExtrinsicFile.internalBinaryWrite(message.extrinsicFile[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* autoplt.transform.WorkMode work_mode = 4; */
        if (message.workMode !== 0)
            writer.tag(4, WireType.Varint).int32(message.workMode);
        /* optional int32 utm_zone = 5; */
        if (message.utmZone !== undefined)
            writer.tag(5, WireType.Varint).int32(message.utmZone);
        /* optional bool rtk_record = 6; */
        if (message.rtkRecord !== undefined)
            writer.tag(6, WireType.Varint).bool(message.rtkRecord);
        /* optional string record_path = 7; */
        if (message.recordPath !== undefined)
            writer.tag(7, WireType.LengthDelimited).string(message.recordPath);
        /* optional string pose_output_path = 8; */
        if (message.poseOutputPath !== undefined)
            writer.tag(8, WireType.LengthDelimited).string(message.poseOutputPath);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.transform.GlobalConf
 */
export const GlobalConf = new GlobalConf$Type();