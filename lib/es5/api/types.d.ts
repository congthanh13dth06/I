import { type Method, type AxiosBasicCredentials } from 'axios';
export interface IApiRequest {
    method: Lowercase<Method>;
    url: string;
    payload?: any;
    params?: any;
    host?: string;
    headers?: object;
    timeout?: number;
    auth?: AxiosBasicCredentials;
    maxBodyLength?: any;
}
export interface IResponse<T = any> {
    code: string | number;
    data: T;
    message: string;
}
export interface IResponseApiLogin {
    accessToken: string;
}
export interface IResponseApiLogout {
}
export interface IPayloadApiGetRoom {
    order: string;
    by: string;
    from: number;
    limit?: number;
}
interface IRoom {
    roomId: string;
    roomCallChatId: string;
    lastMessage?: string;
    roomName?: string;
    timeLastMessage?: number;
    isDirect?: number;
    unreadMessage?: number;
    members?: string[];
    isMute?: number;
}
export interface IResponseApiGetRoom {
    list: IRoom[];
    total: number;
}
export interface IPayloadApiCheckRoom {
    externalId: string;
    appId: string;
}
export interface IResponseApiCheckRoom {
    roomId: string;
    roomCallChatId: string;
    sender?: string;
    userId?: string;
    isDirect?: number;
}
export interface IPayloadApiCreateRoom {
    isDirect: number;
    externalIds: string[];
    roomName?: string;
}
export interface IResponseApiCreateRoom {
    roomId: string;
    roomCallChatId?: string;
}
export interface IPayloadApiCreateRoom {
    isDirect: number;
    externalIds: string[];
    roomName?: string;
}
export interface IPayloadApiDeleteRoom {
    roomIds: string[];
}
export interface IPayloadApiMuteRoom {
    roomId: string;
}
export interface IPayloadApiGetMessage {
    roomId: string;
    limit: number;
    from?: number;
    dir: string;
}
interface IMessageContent {
    body: string;
    msgtype: string;
    url?: string;
    info?: object;
}
interface IMessage {
    type: string;
    room_id: string;
    user_id?: string;
    externalId?: string;
    origin_server_ts?: number;
    event_id?: string;
    content?: IMessageContent;
}
export interface IResponseApiGetMessage {
    chunk: IMessage[];
    start?: string;
    end?: string;
}
export declare enum MessageTypeEnum {
    MESSAGE = "m.text",
    PDF = "m.file",
    IMAGE = "m.image"
}
export interface IPayloadApiSendMessage {
    roomId: string;
    body?: string;
    msgType?: string;
}
export interface IPayloadApiSendMessageImage extends IPayloadApiSendMessage {
    fileName?: string;
    info?: {
        mimetype?: string;
        size?: number;
        h?: number;
        w?: number;
    };
    url?: string;
}
export interface IResponseApiUploadMedia {
    contentUri: string;
}
export {};
