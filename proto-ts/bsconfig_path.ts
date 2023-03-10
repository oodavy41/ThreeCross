// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "bsconfig_path.proto" (package "ec.ConfigPath", syntax proto2)
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
 * @generated from protobuf message ec.ConfigPath.configPath
 */
export interface configPath {
    /**
     * @generated from protobuf field: optional string login_info_path = 1;
     */
    loginInfoPath?: string;
    /**
     * @generated from protobuf field: optional string ip_conf1 = 2;
     */
    ipConf1?: string;
    /**
     * @generated from protobuf field: optional string ip_conf2 = 3;
     */
    ipConf2?: string;
    /**
     * @generated from protobuf field: optional string device_conf = 4;
     */
    deviceConf?: string;
    /**
     * @generated from protobuf field: optional string domain_conf1 = 5;
     */
    domainConf1?: string;
    /**
     * @generated from protobuf field: optional string domain_conf2 = 6;
     */
    domainConf2?: string;
    /**
     * @generated from protobuf field: optional string calib_camera_conf = 7;
     */
    calibCameraConf?: string;
    /**
     * @generated from protobuf field: optional string calib_radar_conf = 8;
     */
    calibRadarConf?: string;
    /**
     * @generated from protobuf field: optional string timed_conf = 9;
     */
    timedConf?: string;
    /**
     * @generated from protobuf field: optional string reboot_conf1 = 10;
     */
    rebootConf1?: string;
    /**
     * @generated from protobuf field: optional string reboot_conf2 = 11;
     */
    rebootConf2?: string;
    /**
     * @generated from protobuf field: optional string upload_radar_calib_path = 12;
     */
    uploadRadarCalibPath?: string;
    /**
     * @generated from protobuf field: optional string upload_video_calib_path = 13;
     */
    uploadVideoCalibPath?: string;
    /**
     * @generated from protobuf field: optional string sh_file_path = 14;
     */
    shFilePath?: string;
    /**
     * @generated from protobuf field: optional ec.ConfigPath.configPath.LogLevel loglevel = 15;
     */
    loglevel?: configPath_LogLevel;
    /**
     * @generated from protobuf field: optional string logpath = 16;
     */
    logpath?: string;
    /**
     * @generated from protobuf field: optional string calib_save_path = 17;
     */
    calibSavePath?: string;
    /**
     * @generated from protobuf field: optional string road_calib_path = 49;
     */
    roadCalibPath?: string;
    /**
     * @generated from protobuf field: optional string app_name = 18;
     */
    appName?: string;
    /**
     * @generated from protobuf field: optional string device_info1 = 19;
     */
    deviceInfo1?: string;
    /**
     * @generated from protobuf field: optional string pole_id_path = 20;
     */
    poleIdPath?: string;
    /**
     * @generated from protobuf field: optional string camera_file0 = 22;
     */
    cameraFile0?: string;
    /**
     * @generated from protobuf field: optional string camera_file1 = 23;
     */
    cameraFile1?: string;
    /**
     * @generated from protobuf field: optional string camera_file2 = 24;
     */
    cameraFile2?: string;
    /**
     * @generated from protobuf field: optional string camera_file3 = 25;
     */
    cameraFile3?: string;
    /**
     * @generated from protobuf field: optional string radar_file0 = 26;
     */
    radarFile0?: string;
    /**
     * @generated from protobuf field: optional string radar_file1 = 27;
     */
    radarFile1?: string;
    /**
     * @generated from protobuf field: optional string road_file0 = 28;
     */
    roadFile0?: string;
    /**
     * @generated from protobuf field: optional string road_file1 = 29;
     */
    roadFile1?: string;
    /**
     * @generated from protobuf field: optional string road_file2 = 30;
     */
    roadFile2?: string;
    /**
     * @generated from protobuf field: optional string road_file3 = 31;
     */
    roadFile3?: string;
    /**
     * @generated from protobuf field: optional string rtk_file = 32;
     */
    rtkFile?: string;
    /**
     * @generated from protobuf field: optional string bak_root = 33;
     */
    bakRoot?: string;
    /**
     * @generated from protobuf field: optional string camera_bak_dir = 34;
     */
    cameraBakDir?: string;
    /**
     * @generated from protobuf field: optional string radar_bak_dir = 35;
     */
    radarBakDir?: string;
    /**
     * @generated from protobuf field: optional string road_calib_bak_dir = 36;
     */
    roadCalibBakDir?: string;
    /**
     * @generated from protobuf field: optional string rtk_bak_dir = 37;
     */
    rtkBakDir?: string;
    /**
     * @generated from protobuf field: optional string ota_save_path = 38;
     */
    otaSavePath?: string;
    /**
     * @generated from protobuf field: optional string ota_bak_dir = 39;
     */
    otaBakDir?: string;
    /**
     * @generated from protobuf field: optional string radar1_conf = 40;
     */
    radar1Conf?: string;
    /**
     * @generated from protobuf field: optional string radar2_conf = 41;
     */
    radar2Conf?: string;
    /**
     * @generated from protobuf field: optional string radar3_conf = 50;
     */
    radar3Conf?: string;
    /**
     * @generated from protobuf field: optional string radar4_conf = 51;
     */
    radar4Conf?: string;
    /**
     * @generated from protobuf field: optional string radar_conf = 42;
     */
    radarConf?: string;
    /**
     * @generated from protobuf field: optional string log_dir = 43;
     */
    logDir?: string;
    /**
     * @generated from protobuf field: optional string loglevel_path = 44;
     */
    loglevelPath?: string;
    /**
     * @generated from protobuf field: optional string conf_zip_path = 45;
     */
    confZipPath?: string;
    /**
     * @generated from protobuf field: optional string conf_temp_path = 46;
     */
    confTempPath?: string;
    /**
     * @generated from protobuf field: optional string conf_file_path = 47;
     */
    confFilePath?: string;
    /**
     * @generated from protobuf field: optional string roicalibfile = 48;
     */
    roicalibfile?: string;
}
/**
 * @generated from protobuf enum ec.ConfigPath.configPath.LogLevel
 */
export enum configPath_LogLevel {
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
class configPath$Type extends MessageType<configPath> {
    constructor() {
        super("ec.ConfigPath.configPath", [
            { no: 1, name: "login_info_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "ip_conf1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "ip_conf2", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "device_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "domain_conf1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "domain_conf2", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "calib_camera_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "calib_radar_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "timed_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "reboot_conf1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "reboot_conf2", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "upload_radar_calib_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 13, name: "upload_video_calib_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 14, name: "sh_file_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 15, name: "loglevel", kind: "enum", opt: true, T: () => ["ec.ConfigPath.configPath.LogLevel", configPath_LogLevel] },
            { no: 16, name: "logpath", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 17, name: "calib_save_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 49, name: "road_calib_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 18, name: "app_name", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 19, name: "device_info1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 20, name: "pole_id_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 22, name: "camera_file0", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 23, name: "camera_file1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 24, name: "camera_file2", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 25, name: "camera_file3", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 26, name: "radar_file0", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 27, name: "radar_file1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 28, name: "road_file0", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 29, name: "road_file1", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 30, name: "road_file2", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 31, name: "road_file3", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 32, name: "rtk_file", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 33, name: "bak_root", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 34, name: "camera_bak_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 35, name: "radar_bak_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 36, name: "road_calib_bak_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 37, name: "rtk_bak_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 38, name: "ota_save_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 39, name: "ota_bak_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 40, name: "radar1_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 41, name: "radar2_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 50, name: "radar3_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 51, name: "radar4_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 42, name: "radar_conf", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 43, name: "log_dir", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 44, name: "loglevel_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 45, name: "conf_zip_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 46, name: "conf_temp_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 47, name: "conf_file_path", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 48, name: "roicalibfile", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<configPath>): configPath {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<configPath>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: configPath): configPath {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string login_info_path */ 1:
                    message.loginInfoPath = reader.string();
                    break;
                case /* optional string ip_conf1 */ 2:
                    message.ipConf1 = reader.string();
                    break;
                case /* optional string ip_conf2 */ 3:
                    message.ipConf2 = reader.string();
                    break;
                case /* optional string device_conf */ 4:
                    message.deviceConf = reader.string();
                    break;
                case /* optional string domain_conf1 */ 5:
                    message.domainConf1 = reader.string();
                    break;
                case /* optional string domain_conf2 */ 6:
                    message.domainConf2 = reader.string();
                    break;
                case /* optional string calib_camera_conf */ 7:
                    message.calibCameraConf = reader.string();
                    break;
                case /* optional string calib_radar_conf */ 8:
                    message.calibRadarConf = reader.string();
                    break;
                case /* optional string timed_conf */ 9:
                    message.timedConf = reader.string();
                    break;
                case /* optional string reboot_conf1 */ 10:
                    message.rebootConf1 = reader.string();
                    break;
                case /* optional string reboot_conf2 */ 11:
                    message.rebootConf2 = reader.string();
                    break;
                case /* optional string upload_radar_calib_path */ 12:
                    message.uploadRadarCalibPath = reader.string();
                    break;
                case /* optional string upload_video_calib_path */ 13:
                    message.uploadVideoCalibPath = reader.string();
                    break;
                case /* optional string sh_file_path */ 14:
                    message.shFilePath = reader.string();
                    break;
                case /* optional ec.ConfigPath.configPath.LogLevel loglevel */ 15:
                    message.loglevel = reader.int32();
                    break;
                case /* optional string logpath */ 16:
                    message.logpath = reader.string();
                    break;
                case /* optional string calib_save_path */ 17:
                    message.calibSavePath = reader.string();
                    break;
                case /* optional string road_calib_path */ 49:
                    message.roadCalibPath = reader.string();
                    break;
                case /* optional string app_name */ 18:
                    message.appName = reader.string();
                    break;
                case /* optional string device_info1 */ 19:
                    message.deviceInfo1 = reader.string();
                    break;
                case /* optional string pole_id_path */ 20:
                    message.poleIdPath = reader.string();
                    break;
                case /* optional string camera_file0 */ 22:
                    message.cameraFile0 = reader.string();
                    break;
                case /* optional string camera_file1 */ 23:
                    message.cameraFile1 = reader.string();
                    break;
                case /* optional string camera_file2 */ 24:
                    message.cameraFile2 = reader.string();
                    break;
                case /* optional string camera_file3 */ 25:
                    message.cameraFile3 = reader.string();
                    break;
                case /* optional string radar_file0 */ 26:
                    message.radarFile0 = reader.string();
                    break;
                case /* optional string radar_file1 */ 27:
                    message.radarFile1 = reader.string();
                    break;
                case /* optional string road_file0 */ 28:
                    message.roadFile0 = reader.string();
                    break;
                case /* optional string road_file1 */ 29:
                    message.roadFile1 = reader.string();
                    break;
                case /* optional string road_file2 */ 30:
                    message.roadFile2 = reader.string();
                    break;
                case /* optional string road_file3 */ 31:
                    message.roadFile3 = reader.string();
                    break;
                case /* optional string rtk_file */ 32:
                    message.rtkFile = reader.string();
                    break;
                case /* optional string bak_root */ 33:
                    message.bakRoot = reader.string();
                    break;
                case /* optional string camera_bak_dir */ 34:
                    message.cameraBakDir = reader.string();
                    break;
                case /* optional string radar_bak_dir */ 35:
                    message.radarBakDir = reader.string();
                    break;
                case /* optional string road_calib_bak_dir */ 36:
                    message.roadCalibBakDir = reader.string();
                    break;
                case /* optional string rtk_bak_dir */ 37:
                    message.rtkBakDir = reader.string();
                    break;
                case /* optional string ota_save_path */ 38:
                    message.otaSavePath = reader.string();
                    break;
                case /* optional string ota_bak_dir */ 39:
                    message.otaBakDir = reader.string();
                    break;
                case /* optional string radar1_conf */ 40:
                    message.radar1Conf = reader.string();
                    break;
                case /* optional string radar2_conf */ 41:
                    message.radar2Conf = reader.string();
                    break;
                case /* optional string radar3_conf */ 50:
                    message.radar3Conf = reader.string();
                    break;
                case /* optional string radar4_conf */ 51:
                    message.radar4Conf = reader.string();
                    break;
                case /* optional string radar_conf */ 42:
                    message.radarConf = reader.string();
                    break;
                case /* optional string log_dir */ 43:
                    message.logDir = reader.string();
                    break;
                case /* optional string loglevel_path */ 44:
                    message.loglevelPath = reader.string();
                    break;
                case /* optional string conf_zip_path */ 45:
                    message.confZipPath = reader.string();
                    break;
                case /* optional string conf_temp_path */ 46:
                    message.confTempPath = reader.string();
                    break;
                case /* optional string conf_file_path */ 47:
                    message.confFilePath = reader.string();
                    break;
                case /* optional string roicalibfile */ 48:
                    message.roicalibfile = reader.string();
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
    internalBinaryWrite(message: configPath, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string login_info_path = 1; */
        if (message.loginInfoPath !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.loginInfoPath);
        /* optional string ip_conf1 = 2; */
        if (message.ipConf1 !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.ipConf1);
        /* optional string ip_conf2 = 3; */
        if (message.ipConf2 !== undefined)
            writer.tag(3, WireType.LengthDelimited).string(message.ipConf2);
        /* optional string device_conf = 4; */
        if (message.deviceConf !== undefined)
            writer.tag(4, WireType.LengthDelimited).string(message.deviceConf);
        /* optional string domain_conf1 = 5; */
        if (message.domainConf1 !== undefined)
            writer.tag(5, WireType.LengthDelimited).string(message.domainConf1);
        /* optional string domain_conf2 = 6; */
        if (message.domainConf2 !== undefined)
            writer.tag(6, WireType.LengthDelimited).string(message.domainConf2);
        /* optional string calib_camera_conf = 7; */
        if (message.calibCameraConf !== undefined)
            writer.tag(7, WireType.LengthDelimited).string(message.calibCameraConf);
        /* optional string calib_radar_conf = 8; */
        if (message.calibRadarConf !== undefined)
            writer.tag(8, WireType.LengthDelimited).string(message.calibRadarConf);
        /* optional string timed_conf = 9; */
        if (message.timedConf !== undefined)
            writer.tag(9, WireType.LengthDelimited).string(message.timedConf);
        /* optional string reboot_conf1 = 10; */
        if (message.rebootConf1 !== undefined)
            writer.tag(10, WireType.LengthDelimited).string(message.rebootConf1);
        /* optional string reboot_conf2 = 11; */
        if (message.rebootConf2 !== undefined)
            writer.tag(11, WireType.LengthDelimited).string(message.rebootConf2);
        /* optional string upload_radar_calib_path = 12; */
        if (message.uploadRadarCalibPath !== undefined)
            writer.tag(12, WireType.LengthDelimited).string(message.uploadRadarCalibPath);
        /* optional string upload_video_calib_path = 13; */
        if (message.uploadVideoCalibPath !== undefined)
            writer.tag(13, WireType.LengthDelimited).string(message.uploadVideoCalibPath);
        /* optional string sh_file_path = 14; */
        if (message.shFilePath !== undefined)
            writer.tag(14, WireType.LengthDelimited).string(message.shFilePath);
        /* optional ec.ConfigPath.configPath.LogLevel loglevel = 15; */
        if (message.loglevel !== undefined)
            writer.tag(15, WireType.Varint).int32(message.loglevel);
        /* optional string logpath = 16; */
        if (message.logpath !== undefined)
            writer.tag(16, WireType.LengthDelimited).string(message.logpath);
        /* optional string calib_save_path = 17; */
        if (message.calibSavePath !== undefined)
            writer.tag(17, WireType.LengthDelimited).string(message.calibSavePath);
        /* optional string road_calib_path = 49; */
        if (message.roadCalibPath !== undefined)
            writer.tag(49, WireType.LengthDelimited).string(message.roadCalibPath);
        /* optional string app_name = 18; */
        if (message.appName !== undefined)
            writer.tag(18, WireType.LengthDelimited).string(message.appName);
        /* optional string device_info1 = 19; */
        if (message.deviceInfo1 !== undefined)
            writer.tag(19, WireType.LengthDelimited).string(message.deviceInfo1);
        /* optional string pole_id_path = 20; */
        if (message.poleIdPath !== undefined)
            writer.tag(20, WireType.LengthDelimited).string(message.poleIdPath);
        /* optional string camera_file0 = 22; */
        if (message.cameraFile0 !== undefined)
            writer.tag(22, WireType.LengthDelimited).string(message.cameraFile0);
        /* optional string camera_file1 = 23; */
        if (message.cameraFile1 !== undefined)
            writer.tag(23, WireType.LengthDelimited).string(message.cameraFile1);
        /* optional string camera_file2 = 24; */
        if (message.cameraFile2 !== undefined)
            writer.tag(24, WireType.LengthDelimited).string(message.cameraFile2);
        /* optional string camera_file3 = 25; */
        if (message.cameraFile3 !== undefined)
            writer.tag(25, WireType.LengthDelimited).string(message.cameraFile3);
        /* optional string radar_file0 = 26; */
        if (message.radarFile0 !== undefined)
            writer.tag(26, WireType.LengthDelimited).string(message.radarFile0);
        /* optional string radar_file1 = 27; */
        if (message.radarFile1 !== undefined)
            writer.tag(27, WireType.LengthDelimited).string(message.radarFile1);
        /* optional string road_file0 = 28; */
        if (message.roadFile0 !== undefined)
            writer.tag(28, WireType.LengthDelimited).string(message.roadFile0);
        /* optional string road_file1 = 29; */
        if (message.roadFile1 !== undefined)
            writer.tag(29, WireType.LengthDelimited).string(message.roadFile1);
        /* optional string road_file2 = 30; */
        if (message.roadFile2 !== undefined)
            writer.tag(30, WireType.LengthDelimited).string(message.roadFile2);
        /* optional string road_file3 = 31; */
        if (message.roadFile3 !== undefined)
            writer.tag(31, WireType.LengthDelimited).string(message.roadFile3);
        /* optional string rtk_file = 32; */
        if (message.rtkFile !== undefined)
            writer.tag(32, WireType.LengthDelimited).string(message.rtkFile);
        /* optional string bak_root = 33; */
        if (message.bakRoot !== undefined)
            writer.tag(33, WireType.LengthDelimited).string(message.bakRoot);
        /* optional string camera_bak_dir = 34; */
        if (message.cameraBakDir !== undefined)
            writer.tag(34, WireType.LengthDelimited).string(message.cameraBakDir);
        /* optional string radar_bak_dir = 35; */
        if (message.radarBakDir !== undefined)
            writer.tag(35, WireType.LengthDelimited).string(message.radarBakDir);
        /* optional string road_calib_bak_dir = 36; */
        if (message.roadCalibBakDir !== undefined)
            writer.tag(36, WireType.LengthDelimited).string(message.roadCalibBakDir);
        /* optional string rtk_bak_dir = 37; */
        if (message.rtkBakDir !== undefined)
            writer.tag(37, WireType.LengthDelimited).string(message.rtkBakDir);
        /* optional string ota_save_path = 38; */
        if (message.otaSavePath !== undefined)
            writer.tag(38, WireType.LengthDelimited).string(message.otaSavePath);
        /* optional string ota_bak_dir = 39; */
        if (message.otaBakDir !== undefined)
            writer.tag(39, WireType.LengthDelimited).string(message.otaBakDir);
        /* optional string radar1_conf = 40; */
        if (message.radar1Conf !== undefined)
            writer.tag(40, WireType.LengthDelimited).string(message.radar1Conf);
        /* optional string radar2_conf = 41; */
        if (message.radar2Conf !== undefined)
            writer.tag(41, WireType.LengthDelimited).string(message.radar2Conf);
        /* optional string radar3_conf = 50; */
        if (message.radar3Conf !== undefined)
            writer.tag(50, WireType.LengthDelimited).string(message.radar3Conf);
        /* optional string radar4_conf = 51; */
        if (message.radar4Conf !== undefined)
            writer.tag(51, WireType.LengthDelimited).string(message.radar4Conf);
        /* optional string radar_conf = 42; */
        if (message.radarConf !== undefined)
            writer.tag(42, WireType.LengthDelimited).string(message.radarConf);
        /* optional string log_dir = 43; */
        if (message.logDir !== undefined)
            writer.tag(43, WireType.LengthDelimited).string(message.logDir);
        /* optional string loglevel_path = 44; */
        if (message.loglevelPath !== undefined)
            writer.tag(44, WireType.LengthDelimited).string(message.loglevelPath);
        /* optional string conf_zip_path = 45; */
        if (message.confZipPath !== undefined)
            writer.tag(45, WireType.LengthDelimited).string(message.confZipPath);
        /* optional string conf_temp_path = 46; */
        if (message.confTempPath !== undefined)
            writer.tag(46, WireType.LengthDelimited).string(message.confTempPath);
        /* optional string conf_file_path = 47; */
        if (message.confFilePath !== undefined)
            writer.tag(47, WireType.LengthDelimited).string(message.confFilePath);
        /* optional string roicalibfile = 48; */
        if (message.roicalibfile !== undefined)
            writer.tag(48, WireType.LengthDelimited).string(message.roicalibfile);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ec.ConfigPath.configPath
 */
export const configPath = new configPath$Type();
