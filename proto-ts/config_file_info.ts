// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "config_file_info.proto" (package "ec.ConfigInfo", syntax proto2)
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
 * @generated from protobuf message ec.ConfigInfo.login
 */
export interface login {
    /**
     * @generated from protobuf field: optional string user = 1;
     */
    user?: string;
    /**
     * @generated from protobuf field: optional string pwd = 2;
     */
    pwd?: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class login$Type extends MessageType<login> {
    constructor() {
        super("ec.ConfigInfo.login", [
            { no: 1, name: "user", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "pwd", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<login>): login {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<login>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: login): login {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string user */ 1:
                    message.user = reader.string();
                    break;
                case /* optional string pwd */ 2:
                    message.pwd = reader.string();
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
    internalBinaryWrite(message: login, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string user = 1; */
        if (message.user !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.user);
        /* optional string pwd = 2; */
        if (message.pwd !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.pwd);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.ConfigInfo.login
 */
export const login = new login$Type();
