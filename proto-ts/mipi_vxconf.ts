// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "mipi_vxconf.proto" (package "ec.mipi.vx", syntax proto2)
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
 * @generated from protobuf message ec.mipi.vx.Conf
 */
export interface Conf {
    /**
     * @generated from protobuf field: optional string pub_channel = 1;
     */
    pubChannel?: string;
    /**
     * @generated from protobuf field: optional string logpath = 2;
     */
    logpath?: string;
    /**
     * @generated from protobuf field: optional ec.mipi.vx.LogLevel loglevel = 3;
     */
    loglevel?: LogLevel;
    /**
     * @generated from protobuf field: optional string app_name = 4;
     */
    appName?: string;
    /**
     * @generated from protobuf field: optional uint32 width = 5;
     */
    width?: number;
    /**
     * @generated from protobuf field: optional uint32 height = 6;
     */
    height?: number;
    /**
     * @generated from protobuf field: optional uint32 scale_width = 7;
     */
    scaleWidth?: number;
    /**
     * @generated from protobuf field: optional uint32 scale_height = 8;
     */
    scaleHeight?: number;
}
/**
 * @generated from protobuf enum ec.mipi.vx.LogLevel
 */
export enum LogLevel {
    /**
     * @generated from protobuf enum value: LOGLEVEL_START = 0;
     */
    LOGLEVEL_START = 0,
    /**
     * @generated from protobuf enum value: FETAL = 1;
     */
    FETAL = 1,
    /**
     * @generated from protobuf enum value: ERROR = 2;
     */
    ERROR = 2,
    /**
     * @generated from protobuf enum value: WARNING = 3;
     */
    WARNING = 3,
    /**
     * @generated from protobuf enum value: NOTICE = 4;
     */
    NOTICE = 4,
    /**
     * @generated from protobuf enum value: DEBUG = 5;
     */
    DEBUG = 5,
    /**
     * @generated from protobuf enum value: LOGLEVEL_END = 6;
     */
    LOGLEVEL_END = 6
}
// @generated message type with reflection information, may provide speed optimized methods
class Conf$Type extends MessageType<Conf> {
    constructor() {
        super("ec.mipi.vx.Conf", [
            { no: 1, name: "pub_channel", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "logpath", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "loglevel", kind: "enum", opt: true, T: () => ["ec.mipi.vx.LogLevel", LogLevel] },
            { no: 4, name: "app_name", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "width", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "height", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 7, name: "scale_width", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 8, name: "scale_height", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<Conf>): Conf {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Conf>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Conf): Conf {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string pub_channel */ 1:
                    message.pubChannel = reader.string();
                    break;
                case /* optional string logpath */ 2:
                    message.logpath = reader.string();
                    break;
                case /* optional ec.mipi.vx.LogLevel loglevel */ 3:
                    message.loglevel = reader.int32();
                    break;
                case /* optional string app_name */ 4:
                    message.appName = reader.string();
                    break;
                case /* optional uint32 width */ 5:
                    message.width = reader.uint32();
                    break;
                case /* optional uint32 height */ 6:
                    message.height = reader.uint32();
                    break;
                case /* optional uint32 scale_width */ 7:
                    message.scaleWidth = reader.uint32();
                    break;
                case /* optional uint32 scale_height */ 8:
                    message.scaleHeight = reader.uint32();
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
    internalBinaryWrite(message: Conf, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string pub_channel = 1; */
        if (message.pubChannel !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.pubChannel);
        /* optional string logpath = 2; */
        if (message.logpath !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.logpath);
        /* optional ec.mipi.vx.LogLevel loglevel = 3; */
        if (message.loglevel !== undefined)
            writer.tag(3, WireType.Varint).int32(message.loglevel);
        /* optional string app_name = 4; */
        if (message.appName !== undefined)
            writer.tag(4, WireType.LengthDelimited).string(message.appName);
        /* optional uint32 width = 5; */
        if (message.width !== undefined)
            writer.tag(5, WireType.Varint).uint32(message.width);
        /* optional uint32 height = 6; */
        if (message.height !== undefined)
            writer.tag(6, WireType.Varint).uint32(message.height);
        /* optional uint32 scale_width = 7; */
        if (message.scaleWidth !== undefined)
            writer.tag(7, WireType.Varint).uint32(message.scaleWidth);
        /* optional uint32 scale_height = 8; */
        if (message.scaleHeight !== undefined)
            writer.tag(8, WireType.Varint).uint32(message.scaleHeight);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.mipi.vx.Conf
 */
export const Conf = new Conf$Type();