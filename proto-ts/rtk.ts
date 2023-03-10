// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "rtk.proto" (package "ec.rsu", syntax proto2)
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
 * @generated from protobuf message ec.rsu.Rtk
 */
export interface Rtk {
    /**
     * @generated from protobuf field: optional string rsu_ip = 1;
     */
    rsuIp?: string;
    /**
     * @generated from protobuf field: optional uint32 rsu_port = 2;
     */
    rsuPort?: number;
    /**
     * @generated from protobuf field: optional double lat = 3;
     */
    lat?: number;
    /**
     * @generated from protobuf field: optional double longt = 4;
     */
    longt?: number;
    /**
     * @generated from protobuf field: optional double alt = 5;
     */
    alt?: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class Rtk$Type extends MessageType<Rtk> {
    constructor() {
        super("ec.rsu.Rtk", [
            { no: 1, name: "rsu_ip", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "rsu_port", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "lat", kind: "scalar", opt: true, T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "longt", kind: "scalar", opt: true, T: 1 /*ScalarType.DOUBLE*/ },
            { no: 5, name: "alt", kind: "scalar", opt: true, T: 1 /*ScalarType.DOUBLE*/ }
        ]);
    }
    create(value?: PartialMessage<Rtk>): Rtk {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Rtk>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Rtk): Rtk {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string rsu_ip */ 1:
                    message.rsuIp = reader.string();
                    break;
                case /* optional uint32 rsu_port */ 2:
                    message.rsuPort = reader.uint32();
                    break;
                case /* optional double lat */ 3:
                    message.lat = reader.double();
                    break;
                case /* optional double longt */ 4:
                    message.longt = reader.double();
                    break;
                case /* optional double alt */ 5:
                    message.alt = reader.double();
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
    internalBinaryWrite(message: Rtk, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string rsu_ip = 1; */
        if (message.rsuIp !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.rsuIp);
        /* optional uint32 rsu_port = 2; */
        if (message.rsuPort !== undefined)
            writer.tag(2, WireType.Varint).uint32(message.rsuPort);
        /* optional double lat = 3; */
        if (message.lat !== undefined)
            writer.tag(3, WireType.Bit64).double(message.lat);
        /* optional double longt = 4; */
        if (message.longt !== undefined)
            writer.tag(4, WireType.Bit64).double(message.longt);
        /* optional double alt = 5; */
        if (message.alt !== undefined)
            writer.tag(5, WireType.Bit64).double(message.alt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.rsu.Rtk
 */
export const Rtk = new Rtk$Type();
