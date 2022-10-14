// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "vxconf.proto" (package "ec.vx", syntax proto2)
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
 * @generated from protobuf message ec.vx.Conf
 */
export interface Conf {
    /**
     * @generated from protobuf field: optional string pub0_channel = 1;
     */
    pub0Channel?: string;
    /**
     * @generated from protobuf field: optional string pub1_channel = 2;
     */
    pub1Channel?: string;
    /**
     * @generated from protobuf field: optional string pub2_channel = 3;
     */
    pub2Channel?: string;
    /**
     * @generated from protobuf field: optional string pub3_channel = 4;
     */
    pub3Channel?: string;
    /**
     * @generated from protobuf field: optional string logpath = 5;
     */
    logpath?: string;
    /**
     * @generated from protobuf field: optional ec.vx.LogLevel loglevel = 6;
     */
    loglevel?: LogLevel;
    /**
     * @generated from protobuf field: optional uint32 width = 7;
     */
    width?: number;
    /**
     * @generated from protobuf field: optional uint32 height = 8;
     */
    height?: number;
}
/**
 * @generated from protobuf enum ec.vx.LogLevel
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
        super("ec.vx.Conf", [
            { no: 1, name: "pub0_channel", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "pub1_channel", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "pub2_channel", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "pub3_channel", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "logpath", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "loglevel", kind: "enum", opt: true, T: () => ["ec.vx.LogLevel", LogLevel] },
            { no: 7, name: "width", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 8, name: "height", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ }
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
                case /* optional string pub0_channel */ 1:
                    message.pub0Channel = reader.string();
                    break;
                case /* optional string pub1_channel */ 2:
                    message.pub1Channel = reader.string();
                    break;
                case /* optional string pub2_channel */ 3:
                    message.pub2Channel = reader.string();
                    break;
                case /* optional string pub3_channel */ 4:
                    message.pub3Channel = reader.string();
                    break;
                case /* optional string logpath */ 5:
                    message.logpath = reader.string();
                    break;
                case /* optional ec.vx.LogLevel loglevel */ 6:
                    message.loglevel = reader.int32();
                    break;
                case /* optional uint32 width */ 7:
                    message.width = reader.uint32();
                    break;
                case /* optional uint32 height */ 8:
                    message.height = reader.uint32();
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
        /* optional string pub0_channel = 1; */
        if (message.pub0Channel !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.pub0Channel);
        /* optional string pub1_channel = 2; */
        if (message.pub1Channel !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.pub1Channel);
        /* optional string pub2_channel = 3; */
        if (message.pub2Channel !== undefined)
            writer.tag(3, WireType.LengthDelimited).string(message.pub2Channel);
        /* optional string pub3_channel = 4; */
        if (message.pub3Channel !== undefined)
            writer.tag(4, WireType.LengthDelimited).string(message.pub3Channel);
        /* optional string logpath = 5; */
        if (message.logpath !== undefined)
            writer.tag(5, WireType.LengthDelimited).string(message.logpath);
        /* optional ec.vx.LogLevel loglevel = 6; */
        if (message.loglevel !== undefined)
            writer.tag(6, WireType.Varint).int32(message.loglevel);
        /* optional uint32 width = 7; */
        if (message.width !== undefined)
            writer.tag(7, WireType.Varint).uint32(message.width);
        /* optional uint32 height = 8; */
        if (message.height !== undefined)
            writer.tag(8, WireType.Varint).uint32(message.height);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.vx.Conf
 */
export const Conf = new Conf$Type();
