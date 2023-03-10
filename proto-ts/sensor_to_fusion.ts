// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "sensor_to_fusion.proto" (package "ec.fusion", syntax proto2)
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
import { RadarFrame } from "./ads_radar";
import { ObjectMsg } from "./object_perception_msg";
/**
 * @generated from protobuf message ec.fusion.FusionSensorInfo
 */
export interface FusionSensorInfo {
    /**
     * @generated from protobuf field: optional string sensor_id = 1;
     */
    sensorId?: string; // 传感器ID
    /**
     * @generated from protobuf field: optional uint64 timestamp = 2;
     */
    timestamp?: bigint; // 消息的时间戳
}
/**
 * @generated from protobuf message ec.fusion.SensortoFusion
 */
export interface SensortoFusion {
    /**
     * @generated from protobuf field: optional int32 fusionid = 1;
     */
    fusionid?: number;
    /**
     * @generated from protobuf field: optional ec.perception.ObjectMsg sensorobject = 2;
     */
    sensorobject?: ObjectMsg; // camera fusion object
    /**
     * @generated from protobuf field: optional autoplt.RadarFrame radarframeobject = 3;
     */
    radarframeobject?: RadarFrame; // radar object
    /**
     * @generated from protobuf field: optional ec.perception.ObjectMsg fusionobject = 4;
     */
    fusionobject?: ObjectMsg;
    /**
     * @generated from protobuf field: repeated ec.fusion.FusionSensorInfo fusion_sensor = 5;
     */
    fusionSensor: FusionSensorInfo[];
}
// @generated message type with reflection information, may provide speed optimized methods
class FusionSensorInfo$Type extends MessageType<FusionSensorInfo> {
    constructor() {
        super("ec.fusion.FusionSensorInfo", [
            { no: 1, name: "sensor_id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "timestamp", kind: "scalar", opt: true, T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<FusionSensorInfo>): FusionSensorInfo {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<FusionSensorInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FusionSensorInfo): FusionSensorInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string sensor_id */ 1:
                    message.sensorId = reader.string();
                    break;
                case /* optional uint64 timestamp */ 2:
                    message.timestamp = reader.uint64().toBigInt();
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
    internalBinaryWrite(message: FusionSensorInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string sensor_id = 1; */
        if (message.sensorId !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.sensorId);
        /* optional uint64 timestamp = 2; */
        if (message.timestamp !== undefined)
            writer.tag(2, WireType.Varint).uint64(message.timestamp);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.fusion.FusionSensorInfo
 */
export const FusionSensorInfo = new FusionSensorInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SensortoFusion$Type extends MessageType<SensortoFusion> {
    constructor() {
        super("ec.fusion.SensortoFusion", [
            { no: 1, name: "fusionid", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "sensorobject", kind: "message", T: () => ObjectMsg },
            { no: 3, name: "radarframeobject", kind: "message", T: () => RadarFrame },
            { no: 4, name: "fusionobject", kind: "message", T: () => ObjectMsg },
            { no: 5, name: "fusion_sensor", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => FusionSensorInfo }
        ]);
    }
    create(value?: PartialMessage<SensortoFusion>): SensortoFusion {
        const message = { fusionSensor: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SensortoFusion>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SensortoFusion): SensortoFusion {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional int32 fusionid */ 1:
                    message.fusionid = reader.int32();
                    break;
                case /* optional ec.perception.ObjectMsg sensorobject */ 2:
                    message.sensorobject = ObjectMsg.internalBinaryRead(reader, reader.uint32(), options, message.sensorobject);
                    break;
                case /* optional autoplt.RadarFrame radarframeobject */ 3:
                    message.radarframeobject = RadarFrame.internalBinaryRead(reader, reader.uint32(), options, message.radarframeobject);
                    break;
                case /* optional ec.perception.ObjectMsg fusionobject */ 4:
                    message.fusionobject = ObjectMsg.internalBinaryRead(reader, reader.uint32(), options, message.fusionobject);
                    break;
                case /* repeated ec.fusion.FusionSensorInfo fusion_sensor */ 5:
                    message.fusionSensor.push(FusionSensorInfo.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: SensortoFusion, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional int32 fusionid = 1; */
        if (message.fusionid !== undefined)
            writer.tag(1, WireType.Varint).int32(message.fusionid);
        /* optional ec.perception.ObjectMsg sensorobject = 2; */
        if (message.sensorobject)
            ObjectMsg.internalBinaryWrite(message.sensorobject, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional autoplt.RadarFrame radarframeobject = 3; */
        if (message.radarframeobject)
            RadarFrame.internalBinaryWrite(message.radarframeobject, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional ec.perception.ObjectMsg fusionobject = 4; */
        if (message.fusionobject)
            ObjectMsg.internalBinaryWrite(message.fusionobject, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* repeated ec.fusion.FusionSensorInfo fusion_sensor = 5; */
        for (let i = 0; i < message.fusionSensor.length; i++)
            FusionSensorInfo.internalBinaryWrite(message.fusionSensor[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.fusion.SensortoFusion
 */
export const SensortoFusion = new SensortoFusion$Type();
