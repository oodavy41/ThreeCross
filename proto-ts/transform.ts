// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "transform.proto" (package "autoplt.transform", syntax proto2)
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
 * @generated from protobuf message autoplt.transform.Quaternion
 */
export interface Quaternion {
    /**
     * @generated from protobuf field: double w = 1;
     */
    w: number;
    /**
     * @generated from protobuf field: double x = 2;
     */
    x: number;
    /**
     * @generated from protobuf field: double y = 3;
     */
    y: number;
    /**
     * @generated from protobuf field: double z = 4;
     */
    z: number;
}
/**
 * @generated from protobuf message autoplt.transform.Translation
 */
export interface Translation {
    /**
     * @generated from protobuf field: float x = 1;
     */
    x: number;
    /**
     * @generated from protobuf field: float y = 2;
     */
    y: number;
    /**
     * @generated from protobuf field: float z = 3;
     */
    z: number;
}
/**
 * @generated from protobuf message autoplt.transform.Transform
 */
export interface Transform {
    /**
     * @generated from protobuf field: autoplt.transform.Translation translation = 1;
     */
    translation?: Translation;
    /**
     * @generated from protobuf field: autoplt.transform.Quaternion quaternion = 2;
     */
    quaternion?: Quaternion;
}
// @generated message type with reflection information, may provide speed optimized methods
class Quaternion$Type extends MessageType<Quaternion> {
    constructor() {
        super("autoplt.transform.Quaternion", [
            { no: 1, name: "w", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 2, name: "x", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 3, name: "y", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "z", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ }
        ]);
    }
    create(value?: PartialMessage<Quaternion>): Quaternion {
        const message = { w: 0, x: 0, y: 0, z: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Quaternion>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Quaternion): Quaternion {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* double w */ 1:
                    message.w = reader.double();
                    break;
                case /* double x */ 2:
                    message.x = reader.double();
                    break;
                case /* double y */ 3:
                    message.y = reader.double();
                    break;
                case /* double z */ 4:
                    message.z = reader.double();
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
    internalBinaryWrite(message: Quaternion, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* double w = 1; */
        if (message.w !== 0)
            writer.tag(1, WireType.Bit64).double(message.w);
        /* double x = 2; */
        if (message.x !== 0)
            writer.tag(2, WireType.Bit64).double(message.x);
        /* double y = 3; */
        if (message.y !== 0)
            writer.tag(3, WireType.Bit64).double(message.y);
        /* double z = 4; */
        if (message.z !== 0)
            writer.tag(4, WireType.Bit64).double(message.z);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.transform.Quaternion
 */
export const Quaternion = new Quaternion$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Translation$Type extends MessageType<Translation> {
    constructor() {
        super("autoplt.transform.Translation", [
            { no: 1, name: "x", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "y", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "z", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<Translation>): Translation {
        const message = { x: 0, y: 0, z: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Translation>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Translation): Translation {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float x */ 1:
                    message.x = reader.float();
                    break;
                case /* float y */ 2:
                    message.y = reader.float();
                    break;
                case /* float z */ 3:
                    message.z = reader.float();
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
    internalBinaryWrite(message: Translation, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float x = 1; */
        if (message.x !== 0)
            writer.tag(1, WireType.Bit32).float(message.x);
        /* float y = 2; */
        if (message.y !== 0)
            writer.tag(2, WireType.Bit32).float(message.y);
        /* float z = 3; */
        if (message.z !== 0)
            writer.tag(3, WireType.Bit32).float(message.z);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.transform.Translation
 */
export const Translation = new Translation$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Transform$Type extends MessageType<Transform> {
    constructor() {
        super("autoplt.transform.Transform", [
            { no: 1, name: "translation", kind: "message", T: () => Translation },
            { no: 2, name: "quaternion", kind: "message", T: () => Quaternion }
        ]);
    }
    create(value?: PartialMessage<Transform>): Transform {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Transform>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Transform): Transform {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* autoplt.transform.Translation translation */ 1:
                    message.translation = Translation.internalBinaryRead(reader, reader.uint32(), options, message.translation);
                    break;
                case /* autoplt.transform.Quaternion quaternion */ 2:
                    message.quaternion = Quaternion.internalBinaryRead(reader, reader.uint32(), options, message.quaternion);
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
    internalBinaryWrite(message: Transform, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* autoplt.transform.Translation translation = 1; */
        if (message.translation)
            Translation.internalBinaryWrite(message.translation, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* autoplt.transform.Quaternion quaternion = 2; */
        if (message.quaternion)
            Quaternion.internalBinaryWrite(message.quaternion, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.transform.Transform
 */
export const Transform = new Transform$Type();
