// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "fusion_objects.proto" (package "autoplt.fusion", syntax proto2)
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
import { Transform } from "./transform";
/**
 * @generated from protobuf message autoplt.fusion.BBox2D
 */
export interface BBox2D {
    /**
     * @generated from protobuf field: int32 xmin = 1;
     */
    xmin: number; // in pixels.
    /**
     * @generated from protobuf field: int32 ymin = 2;
     */
    ymin: number; // in pixels.
    /**
     * @generated from protobuf field: int32 xmax = 3;
     */
    xmax: number; // in pixels.
    /**
     * @generated from protobuf field: int32 ymax = 4;
     */
    ymax: number; // in pixels.
    /**
     * @generated from protobuf field: float shape_confidence = 5;
     */
    shapeConfidence: number;
}
/**
 * @generated from protobuf message autoplt.fusion.BBox3D
 */
export interface BBox3D {
    /**
     * @generated from protobuf field: float length = 1;
     */
    length: number; // [m]
    /**
     * @generated from protobuf field: float width = 2;
     */
    width: number; // [m]
    /**
     * @generated from protobuf field: float height = 3;
     */
    height: number; // [m]
    /**
     * @generated from protobuf field: float shape_confidence = 4;
     */
    shapeConfidence: number;
}
/**
 * @generated from protobuf message autoplt.fusion.Vector3D
 */
export interface Vector3D {
    /**
     * @generated from protobuf field: double x = 1;
     */
    x: number;
    /**
     * @generated from protobuf field: double y = 2;
     */
    y: number;
    /**
     * @generated from protobuf field: double z = 3;
     */
    z: number;
    /**
     * @generated from protobuf field: repeated double covariance = 4;
     */
    covariance: number[]; // row-majored 3x3 matrix
}
/**
 * @generated from protobuf message autoplt.fusion.Vector1D
 */
export interface Vector1D {
    /**
     * @generated from protobuf field: float element = 1;
     */
    element: number;
    /**
     * @generated from protobuf field: float variance = 2;
     */
    variance: number;
}
/**
 * @generated from protobuf message autoplt.fusion.Class1D
 */
export interface Class1D {
    /**
     * @generated from protobuf field: autoplt.fusion.ObjectClass object_class = 1;
     */
    objectClass: ObjectClass;
    /**
     * @generated from protobuf field: repeated float class_confidence = 2;
     */
    classConfidence: number[];
    /**
     * @generated from protobuf field: autoplt.fusion.Class1D.ObjectSubClass object_sub_class = 3;
     */
    objectSubClass: Class1D_ObjectSubClass;
    /**
     * @generated from protobuf field: repeated float sub_class_confidence = 4;
     */
    subClassConfidence: number[];
}
/**
 * @generated from protobuf enum autoplt.fusion.Class1D.ObjectSubClass
 */
export enum Class1D_ObjectSubClass {
    /**
     * @generated from protobuf enum value: BST_TYPE_CAR = 0;
     */
    BST_TYPE_CAR = 0,
    /**
     * @generated from protobuf enum value: BST_TYPE_CARSUV = 1;
     */
    BST_TYPE_CARSUV = 1,
    /**
     * @generated from protobuf enum value: BST_TYPE_VAN = 2;
     */
    BST_TYPE_VAN = 2,
    /**
     * @generated from protobuf enum value: BST_TYPE_BUS = 3;
     */
    BST_TYPE_BUS = 3,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRUCK = 4;
     */
    BST_TYPE_TRUCK = 4,
    /**
     * @generated from protobuf enum value: BST_TYPE_CARSPECIAL = 5;
     */
    BST_TYPE_CARSPECIAL = 5,
    /**
     * @generated from protobuf enum value: BST_TYPE_MOTORCYCLE = 6;
     */
    BST_TYPE_MOTORCYCLE = 6,
    /**
     * @generated from protobuf enum value: BST_TYPE_BICYCLE = 7;
     */
    BST_TYPE_BICYCLE = 7,
    /**
     * @generated from protobuf enum value: BST_TYPE_RIDER = 8;
     */
    BST_TYPE_RIDER = 8,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRICYCLE = 9;
     */
    BST_TYPE_TRICYCLE = 9,
    /**
     * @generated from protobuf enum value: BST_TYPE_PEDESTRIAN = 10;
     */
    BST_TYPE_PEDESTRIAN = 10,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRAFFICSIGNS = 11;
     */
    BST_TYPE_TRAFFICSIGNS = 11,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRAFFICCONE = 12;
     */
    BST_TYPE_TRAFFICCONE = 12,
    /**
     * @generated from protobuf enum value: BST_TYPE_UNKNOWN = 13;
     */
    BST_TYPE_UNKNOWN = 13
}
/**
 * @generated from protobuf message autoplt.fusion.PerceptionObject
 */
export interface PerceptionObject {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number; // object ID.
    /**
     * @generated from protobuf field: optional string sensor_id = 2;
     */
    sensorId?: string;
    /**
     * @generated from protobuf field: optional autoplt.fusion.Vector3D position = 3;
     */
    position?: Vector3D; // center position in vehicle coordinate [m]
    /**
     * @generated from protobuf field: optional autoplt.fusion.Vector3D velocity = 4;
     */
    velocity?: Vector3D; // center velocity in vehicle coordinate [m/s]
    /**
     * @generated from protobuf field: optional autoplt.fusion.Vector3D acceleration = 5;
     */
    acceleration?: Vector3D; // acceleration in vehicle coordinate [m/s^2]
    /**
     * @generated from protobuf field: optional autoplt.fusion.Vector1D heading = 6;
     */
    heading?: Vector1D; // heading in vehicle coordinate [rad]
    /**
     * @generated from protobuf field: optional autoplt.fusion.BBox3D size = 7;
     */
    size?: BBox3D;
    /**
     * @generated from protobuf field: optional autoplt.fusion.BBox2D bbox2d = 8 [json_name = "bbox2d"];
     */
    bbox2D?: BBox2D;
    /**
     * @generated from protobuf field: double tracking_time = 9;
     */
    trackingTime: number; // lastest time of an obstacle  detection [s]
    /**
     * @generated from protobuf field: optional float existence_prob = 10;
     */
    existenceProb?: number; // existence probability
    /**
     * @generated from protobuf field: optional autoplt.fusion.Class1D object_class = 11;
     */
    objectClass?: Class1D;
    /**
     * @generated from protobuf field: double status_time = 12;
     */
    statusTime: number; // object perception time
}
/**
 * @generated from protobuf message autoplt.fusion.FusionObjects
 */
export interface FusionObjects {
    /**
     * @generated from protobuf field: optional string fusion_sensor = 1;
     */
    fusionSensor?: string; // sensor name
    /**
     * @generated from protobuf field: autoplt.fusion.ObjectsType object_type = 2;
     */
    objectType: ObjectsType;
    /**
     * @generated from protobuf field: double timestamp = 3;
     */
    timestamp: number;
    /**
     * @generated from protobuf field: optional autoplt.transform.Transform object_trans = 4;
     */
    objectTrans?: Transform;
    /**
     * @generated from protobuf field: repeated autoplt.fusion.PerceptionObject object = 5;
     */
    object: PerceptionObject[];
}
/**
 * @generated from protobuf enum autoplt.fusion.ObjectClass
 */
export enum ObjectClass {
    /**
     * @generated from protobuf enum value: BST_TYPE_CAR = 0;
     */
    BST_TYPE_CAR = 0,
    /**
     * @generated from protobuf enum value: BST_TYPE_CARSUV = 1;
     */
    BST_TYPE_CARSUV = 1,
    /**
     * @generated from protobuf enum value: BST_TYPE_VAN = 2;
     */
    BST_TYPE_VAN = 2,
    /**
     * @generated from protobuf enum value: BST_TYPE_BUS = 3;
     */
    BST_TYPE_BUS = 3,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRUCK = 4;
     */
    BST_TYPE_TRUCK = 4,
    /**
     * @generated from protobuf enum value: BST_TYPE_CARSPECIAL = 5;
     */
    BST_TYPE_CARSPECIAL = 5,
    /**
     * @generated from protobuf enum value: BST_TYPE_MOTORCYCLE = 6;
     */
    BST_TYPE_MOTORCYCLE = 6,
    /**
     * @generated from protobuf enum value: BST_TYPE_BICYCLE = 7;
     */
    BST_TYPE_BICYCLE = 7,
    /**
     * @generated from protobuf enum value: BST_TYPE_RIDER = 8;
     */
    BST_TYPE_RIDER = 8,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRICYCLE = 9;
     */
    BST_TYPE_TRICYCLE = 9,
    /**
     * @generated from protobuf enum value: BST_TYPE_PEDESTRIAN = 10;
     */
    BST_TYPE_PEDESTRIAN = 10,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRAFFICSIGNS = 11;
     */
    BST_TYPE_TRAFFICSIGNS = 11,
    /**
     * @generated from protobuf enum value: BST_TYPE_TRAFFICCONE = 12;
     */
    BST_TYPE_TRAFFICCONE = 12,
    /**
     * @generated from protobuf enum value: BST_TYPE_UNKNOWN = 13;
     */
    BST_TYPE_UNKNOWN = 13
}
/**
 * @generated from protobuf enum autoplt.fusion.ObjectsType
 */
export enum ObjectsType {
    /**
     * @generated from protobuf enum value: UNKNOWN_TYPE = 0;
     */
    UNKNOWN_TYPE = 0,
    /**
     * @generated from protobuf enum value: FUSION = 1;
     */
    FUSION = 1,
    /**
     * @generated from protobuf enum value: CAMERA = 2;
     */
    CAMERA = 2,
    /**
     * @generated from protobuf enum value: RADAR = 3;
     */
    RADAR = 3,
    /**
     * @generated from protobuf enum value: LIDAR = 4;
     */
    LIDAR = 4,
    /**
     * @generated from protobuf enum value: ULTRASONIC = 5;
     */
    ULTRASONIC = 5
}
// @generated message type with reflection information, may provide speed optimized methods
class BBox2D$Type extends MessageType<BBox2D> {
    constructor() {
        super("autoplt.fusion.BBox2D", [
            { no: 1, name: "xmin", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "ymin", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "xmax", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "ymax", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "shape_confidence", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<BBox2D>): BBox2D {
        const message = { xmin: 0, ymin: 0, xmax: 0, ymax: 0, shapeConfidence: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<BBox2D>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: BBox2D): BBox2D {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 xmin */ 1:
                    message.xmin = reader.int32();
                    break;
                case /* int32 ymin */ 2:
                    message.ymin = reader.int32();
                    break;
                case /* int32 xmax */ 3:
                    message.xmax = reader.int32();
                    break;
                case /* int32 ymax */ 4:
                    message.ymax = reader.int32();
                    break;
                case /* float shape_confidence */ 5:
                    message.shapeConfidence = reader.float();
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
    internalBinaryWrite(message: BBox2D, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 xmin = 1; */
        if (message.xmin !== 0)
            writer.tag(1, WireType.Varint).int32(message.xmin);
        /* int32 ymin = 2; */
        if (message.ymin !== 0)
            writer.tag(2, WireType.Varint).int32(message.ymin);
        /* int32 xmax = 3; */
        if (message.xmax !== 0)
            writer.tag(3, WireType.Varint).int32(message.xmax);
        /* int32 ymax = 4; */
        if (message.ymax !== 0)
            writer.tag(4, WireType.Varint).int32(message.ymax);
        /* float shape_confidence = 5; */
        if (message.shapeConfidence !== 0)
            writer.tag(5, WireType.Bit32).float(message.shapeConfidence);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.BBox2D
 */
export const BBox2D = new BBox2D$Type();
// @generated message type with reflection information, may provide speed optimized methods
class BBox3D$Type extends MessageType<BBox3D> {
    constructor() {
        super("autoplt.fusion.BBox3D", [
            { no: 1, name: "length", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "width", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "height", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 4, name: "shape_confidence", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<BBox3D>): BBox3D {
        const message = { length: 0, width: 0, height: 0, shapeConfidence: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<BBox3D>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: BBox3D): BBox3D {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float length */ 1:
                    message.length = reader.float();
                    break;
                case /* float width */ 2:
                    message.width = reader.float();
                    break;
                case /* float height */ 3:
                    message.height = reader.float();
                    break;
                case /* float shape_confidence */ 4:
                    message.shapeConfidence = reader.float();
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
    internalBinaryWrite(message: BBox3D, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float length = 1; */
        if (message.length !== 0)
            writer.tag(1, WireType.Bit32).float(message.length);
        /* float width = 2; */
        if (message.width !== 0)
            writer.tag(2, WireType.Bit32).float(message.width);
        /* float height = 3; */
        if (message.height !== 0)
            writer.tag(3, WireType.Bit32).float(message.height);
        /* float shape_confidence = 4; */
        if (message.shapeConfidence !== 0)
            writer.tag(4, WireType.Bit32).float(message.shapeConfidence);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.BBox3D
 */
export const BBox3D = new BBox3D$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Vector3D$Type extends MessageType<Vector3D> {
    constructor() {
        super("autoplt.fusion.Vector3D", [
            { no: 1, name: "x", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 2, name: "y", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 3, name: "z", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "covariance", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 1 /*ScalarType.DOUBLE*/ }
        ]);
    }
    create(value?: PartialMessage<Vector3D>): Vector3D {
        const message = { x: 0, y: 0, z: 0, covariance: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Vector3D>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Vector3D): Vector3D {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* double x */ 1:
                    message.x = reader.double();
                    break;
                case /* double y */ 2:
                    message.y = reader.double();
                    break;
                case /* double z */ 3:
                    message.z = reader.double();
                    break;
                case /* repeated double covariance */ 4:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.covariance.push(reader.double());
                    else
                        message.covariance.push(reader.double());
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
    internalBinaryWrite(message: Vector3D, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* double x = 1; */
        if (message.x !== 0)
            writer.tag(1, WireType.Bit64).double(message.x);
        /* double y = 2; */
        if (message.y !== 0)
            writer.tag(2, WireType.Bit64).double(message.y);
        /* double z = 3; */
        if (message.z !== 0)
            writer.tag(3, WireType.Bit64).double(message.z);
        /* repeated double covariance = 4; */
        for (let i = 0; i < message.covariance.length; i++)
            writer.tag(4, WireType.Bit64).double(message.covariance[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.Vector3D
 */
export const Vector3D = new Vector3D$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Vector1D$Type extends MessageType<Vector1D> {
    constructor() {
        super("autoplt.fusion.Vector1D", [
            { no: 1, name: "element", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "variance", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<Vector1D>): Vector1D {
        const message = { element: 0, variance: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Vector1D>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Vector1D): Vector1D {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float element */ 1:
                    message.element = reader.float();
                    break;
                case /* float variance */ 2:
                    message.variance = reader.float();
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
    internalBinaryWrite(message: Vector1D, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float element = 1; */
        if (message.element !== 0)
            writer.tag(1, WireType.Bit32).float(message.element);
        /* float variance = 2; */
        if (message.variance !== 0)
            writer.tag(2, WireType.Bit32).float(message.variance);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.Vector1D
 */
export const Vector1D = new Vector1D$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Class1D$Type extends MessageType<Class1D> {
    constructor() {
        super("autoplt.fusion.Class1D", [
            { no: 1, name: "object_class", kind: "enum", T: () => ["autoplt.fusion.ObjectClass", ObjectClass] },
            { no: 2, name: "class_confidence", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "object_sub_class", kind: "enum", T: () => ["autoplt.fusion.Class1D.ObjectSubClass", Class1D_ObjectSubClass] },
            { no: 4, name: "sub_class_confidence", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value?: PartialMessage<Class1D>): Class1D {
        const message = { objectClass: 0, classConfidence: [], objectSubClass: 0, subClassConfidence: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Class1D>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Class1D): Class1D {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* autoplt.fusion.ObjectClass object_class */ 1:
                    message.objectClass = reader.int32();
                    break;
                case /* repeated float class_confidence */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.classConfidence.push(reader.float());
                    else
                        message.classConfidence.push(reader.float());
                    break;
                case /* autoplt.fusion.Class1D.ObjectSubClass object_sub_class */ 3:
                    message.objectSubClass = reader.int32();
                    break;
                case /* repeated float sub_class_confidence */ 4:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.subClassConfidence.push(reader.float());
                    else
                        message.subClassConfidence.push(reader.float());
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
    internalBinaryWrite(message: Class1D, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* autoplt.fusion.ObjectClass object_class = 1; */
        if (message.objectClass !== 0)
            writer.tag(1, WireType.Varint).int32(message.objectClass);
        /* repeated float class_confidence = 2; */
        for (let i = 0; i < message.classConfidence.length; i++)
            writer.tag(2, WireType.Bit32).float(message.classConfidence[i]);
        /* autoplt.fusion.Class1D.ObjectSubClass object_sub_class = 3; */
        if (message.objectSubClass !== 0)
            writer.tag(3, WireType.Varint).int32(message.objectSubClass);
        /* repeated float sub_class_confidence = 4; */
        for (let i = 0; i < message.subClassConfidence.length; i++)
            writer.tag(4, WireType.Bit32).float(message.subClassConfidence[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.Class1D
 */
export const Class1D = new Class1D$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PerceptionObject$Type extends MessageType<PerceptionObject> {
    constructor() {
        super("autoplt.fusion.PerceptionObject", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "sensor_id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "position", kind: "message", T: () => Vector3D },
            { no: 4, name: "velocity", kind: "message", T: () => Vector3D },
            { no: 5, name: "acceleration", kind: "message", T: () => Vector3D },
            { no: 6, name: "heading", kind: "message", T: () => Vector1D },
            { no: 7, name: "size", kind: "message", T: () => BBox3D },
            { no: 8, name: "bbox2d", kind: "message", jsonName: "bbox2d", T: () => BBox2D },
            { no: 9, name: "tracking_time", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 10, name: "existence_prob", kind: "scalar", opt: true, T: 2 /*ScalarType.FLOAT*/ },
            { no: 11, name: "object_class", kind: "message", T: () => Class1D },
            { no: 12, name: "status_time", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ }
        ]);
    }
    create(value?: PartialMessage<PerceptionObject>): PerceptionObject {
        const message = { id: 0, trackingTime: 0, statusTime: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<PerceptionObject>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PerceptionObject): PerceptionObject {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* optional string sensor_id */ 2:
                    message.sensorId = reader.string();
                    break;
                case /* optional autoplt.fusion.Vector3D position */ 3:
                    message.position = Vector3D.internalBinaryRead(reader, reader.uint32(), options, message.position);
                    break;
                case /* optional autoplt.fusion.Vector3D velocity */ 4:
                    message.velocity = Vector3D.internalBinaryRead(reader, reader.uint32(), options, message.velocity);
                    break;
                case /* optional autoplt.fusion.Vector3D acceleration */ 5:
                    message.acceleration = Vector3D.internalBinaryRead(reader, reader.uint32(), options, message.acceleration);
                    break;
                case /* optional autoplt.fusion.Vector1D heading */ 6:
                    message.heading = Vector1D.internalBinaryRead(reader, reader.uint32(), options, message.heading);
                    break;
                case /* optional autoplt.fusion.BBox3D size */ 7:
                    message.size = BBox3D.internalBinaryRead(reader, reader.uint32(), options, message.size);
                    break;
                case /* optional autoplt.fusion.BBox2D bbox2d = 8 [json_name = "bbox2d"];*/ 8:
                    message.bbox2D = BBox2D.internalBinaryRead(reader, reader.uint32(), options, message.bbox2D);
                    break;
                case /* double tracking_time */ 9:
                    message.trackingTime = reader.double();
                    break;
                case /* optional float existence_prob */ 10:
                    message.existenceProb = reader.float();
                    break;
                case /* optional autoplt.fusion.Class1D object_class */ 11:
                    message.objectClass = Class1D.internalBinaryRead(reader, reader.uint32(), options, message.objectClass);
                    break;
                case /* double status_time */ 12:
                    message.statusTime = reader.double();
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
    internalBinaryWrite(message: PerceptionObject, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* optional string sensor_id = 2; */
        if (message.sensorId !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.sensorId);
        /* optional autoplt.fusion.Vector3D position = 3; */
        if (message.position)
            Vector3D.internalBinaryWrite(message.position, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.fusion.Vector3D velocity = 4; */
        if (message.velocity)
            Vector3D.internalBinaryWrite(message.velocity, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.fusion.Vector3D acceleration = 5; */
        if (message.acceleration)
            Vector3D.internalBinaryWrite(message.acceleration, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.fusion.Vector1D heading = 6; */
        if (message.heading)
            Vector1D.internalBinaryWrite(message.heading, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.fusion.BBox3D size = 7; */
        if (message.size)
            BBox3D.internalBinaryWrite(message.size, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.fusion.BBox2D bbox2d = 8 [json_name = "bbox2d"]; */
        if (message.bbox2D)
            BBox2D.internalBinaryWrite(message.bbox2D, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        /* double tracking_time = 9; */
        if (message.trackingTime !== 0)
            writer.tag(9, WireType.Bit64).double(message.trackingTime);
        /* optional float existence_prob = 10; */
        if (message.existenceProb !== undefined)
            writer.tag(10, WireType.Bit32).float(message.existenceProb);
        /* optional autoplt.fusion.Class1D object_class = 11; */
        if (message.objectClass)
            Class1D.internalBinaryWrite(message.objectClass, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* double status_time = 12; */
        if (message.statusTime !== 0)
            writer.tag(12, WireType.Bit64).double(message.statusTime);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.PerceptionObject
 */
export const PerceptionObject = new PerceptionObject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FusionObjects$Type extends MessageType<FusionObjects> {
    constructor() {
        super("autoplt.fusion.FusionObjects", [
            { no: 1, name: "fusion_sensor", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "object_type", kind: "enum", T: () => ["autoplt.fusion.ObjectsType", ObjectsType] },
            { no: 3, name: "timestamp", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "object_trans", kind: "message", T: () => Transform },
            { no: 5, name: "object", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => PerceptionObject }
        ]);
    }
    create(value?: PartialMessage<FusionObjects>): FusionObjects {
        const message = { objectType: 0, timestamp: 0, object: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<FusionObjects>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FusionObjects): FusionObjects {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string fusion_sensor */ 1:
                    message.fusionSensor = reader.string();
                    break;
                case /* autoplt.fusion.ObjectsType object_type */ 2:
                    message.objectType = reader.int32();
                    break;
                case /* double timestamp */ 3:
                    message.timestamp = reader.double();
                    break;
                case /* optional autoplt.transform.Transform object_trans */ 4:
                    message.objectTrans = Transform.internalBinaryRead(reader, reader.uint32(), options, message.objectTrans);
                    break;
                case /* repeated autoplt.fusion.PerceptionObject object */ 5:
                    message.object.push(PerceptionObject.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: FusionObjects, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string fusion_sensor = 1; */
        if (message.fusionSensor !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.fusionSensor);
        /* autoplt.fusion.ObjectsType object_type = 2; */
        if (message.objectType !== 0)
            writer.tag(2, WireType.Varint).int32(message.objectType);
        /* double timestamp = 3; */
        if (message.timestamp !== 0)
            writer.tag(3, WireType.Bit64).double(message.timestamp);
        /* optional autoplt.transform.Transform object_trans = 4; */
        if (message.objectTrans)
            Transform.internalBinaryWrite(message.objectTrans, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* repeated autoplt.fusion.PerceptionObject object = 5; */
        for (let i = 0; i < message.object.length; i++)
            PerceptionObject.internalBinaryWrite(message.object[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message autoplt.fusion.FusionObjects
 */
export const FusionObjects = new FusionObjects$Type();