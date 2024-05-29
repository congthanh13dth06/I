var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as sdk from "matrix-js-sdk";
import { logger as matrixLogger } from "matrix-js-sdk/lib/logger";
import { request } from "./api/request";
import { MessageTypeEnum, } from "./api/types";
import { Logger } from "./utils/logger";
import { Helper } from "./utils/helper";
// @ts-ignore
matrixLogger.disableAll();
class SDK {
    static init() {
        if (!SDK.instance) {
            SDK.instance = new SDK();
        }
        return SDK.instance;
    }
    constructor() {
        this.client = null;
        this.apiURL = null;
        this.baseURL = null;
        this.appId = null;
        this.synapseDomain = null;
        this.userId = null;
        this.accessToken = null; // none expire
        this.externalId = null;
    }
    setApiURL(apiURL, username, password) {
        this.apiURL = apiURL;
        this.apiURLBasicAuth = {
            username,
            password,
        };
        return this;
    }
    setBaseURL(baseURL) {
        this.baseURL = baseURL;
        return this;
    }
    setAppId(appId) {
        this.appId = appId;
        return this;
    }
    setSynapseDomain(synapseDomain) {
        this.synapseDomain = synapseDomain;
        return this;
    }
    setUserId(userId) {
        this.userId = userId;
        return this;
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        return this;
    }
    setExternalId() {
        this.externalId = `@${this.appId}${this.userId}:${this.synapseDomain}`;
        // this.externalId = `@${this.userId}`;
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute start`);
                this.setExternalId();
                const response = yield this.login();
                this.setAccessToken(response.data.accessToken);
                this.client = sdk.createClient({
                    baseUrl: this.baseURL,
                    accessToken: this.accessToken,
                    userId: this.externalId,
                });
                this.client.startClient();
            }
            catch (e) {
                Logger.error(`SDK execute start `, e);
                // throw e;
            }
        });
    }
    /* KYC */
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute login`);
                const options = {
                    host: this.apiURL,
                    url: "/private/login",
                    method: "post",
                    headers: {},
                    payload: {
                        // externalId: this.externalId,
                        externalId: this.userId,
                        appId: this.appId,
                    },
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute login using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute login receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute login `, e);
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute logout`);
                const options = {
                    host: this.apiURL,
                    url: "/private/logout",
                    method: "post",
                    headers: {},
                    payload: {
                        externalId: this.userId,
                        appId: this.appId,
                    },
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute logout using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute logout receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute logout `, e);
            }
        });
    }
    /* Rooms */
    getRoom(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute getRoom`);
                Logger.debug(`SDK execute getRoom receive payload `, payload);
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute getRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute getRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute getRoom `, e);
            }
        });
    }
    checkRoom(externalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute checkRoom`);
                Logger.debug(`SDK execute checkRoom receive externalId `, externalId);
                const payload = {
                    externalId: externalId,
                    appId: this.appId,
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room/check",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute checkRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute checkRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute checkRoom `, e);
            }
        });
    }
    createRoom(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute createRoom`);
                Logger.debug(`SDK execute createRoom receive payload: `, payload);
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room",
                    method: "put",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute createRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute createRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute createRoom `, e);
            }
        });
    }
    deleteRoom(roomIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute deleteRoom`);
                Logger.debug(`SDK execute deleteRoom receive roomIds: `, roomIds);
                const payload = {
                    roomIds: roomIds
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room/delete",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute deleteRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute deleteRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute deleteRoom `, e);
            }
        });
    }
    muteRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute muteRoom`);
                Logger.debug(`SDK execute muteRoom receive roomId: `, roomId);
                const payload = {
                    roomId
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room/mute",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute muteRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute muteRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute muteRoom `, e);
            }
        });
    }
    unMuteRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute unMuteRoom`);
                Logger.debug(`SDK execute unMuteRoom receive roomId: `, roomId);
                const payload = {
                    roomId
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/room/mute",
                    method: "put",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute unMuteRoom using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute unMuteRoom receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute unMuteRoom `, e);
            }
        });
    }
    /* Message */
    getMessage(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute getMessage`);
                Logger.debug(`SDK execute getMessage receive payload: `, payload);
                const options = {
                    host: this.apiURL,
                    url: "/sdk/message",
                    method: "put",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute getMessage using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute getMessage receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute getMessage `, e);
            }
        });
    }
    sendMessage(roomId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute sendMessage`);
                Logger.debug(`SDK execute sendMessage receive roomId: `, roomId);
                Logger.debug(`SDK execute sendMessage receive content: `, content);
                const payload = {
                    roomId,
                    body: content,
                    msgType: MessageTypeEnum.MESSAGE,
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/message",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                Logger.debug(`SDK execute sendMessage using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute sendMessage receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute sendMessage `, e);
            }
        });
    }
    uploadMedia(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute uploadMedia`);
                Logger.debug(`SDK execute uploadMedia receive base64: `, base64); // base64
                const options = {
                    host: this.apiURL,
                    url: "/sdk/upload",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: base64,
                    auth: this.apiURLBasicAuth,
                    maxBodyLength: Infinity
                };
                Logger.debug(`SDK execute uploadMedia using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute uploadMedia receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute uploadMedia `, e);
            }
        });
    }
    sendMessageImage(roomId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute sendMessageImage`);
                Logger.debug(`SDK execute sendMessageImage receive roomId: `, roomId);
                Logger.debug(`SDK execute sendMessageImage receive image: `, image); // files
                const base64 = yield Helper.convertFileToBase64(image);
                const imageLink = yield this.uploadMedia(base64);
                const payload = {
                    roomId: roomId,
                    body: image.name,
                    msgType: MessageTypeEnum.IMAGE,
                    url: imageLink.data.contentUri,
                    info: {
                        mimetype: image.type,
                        w: 200,
                        h: 200,
                        size: image.size,
                    }
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/message",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                // const imagesLink = await Promise.all(
                //     images.map(async (item: File) => {
                //         const base64 = await Helper.convertFileToBase64(item);
                //         return await this.uploadMedia(base64)
                //     })
                // )
                // await Promise.all(
                //     imagesLink.map(async (item: IResponse<IResponseApiUploadMedia>) => {
                //       options.payload = {
                //         roomId: roomId,
                //         // body: `${}.${}`
                //       } as IPayloadApiSendMessageImage;
                //       return await request(options)
                //     })
                // )
                Logger.debug(`SDK execute sendMessageImage using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute sendMessageImage receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute sendMessageImage `, e);
            }
        });
    }
    sendMessageFile(roomId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger.info(`SDK execute sendMessageFile`);
                Logger.debug(`SDK execute sendMessageFile receive roomId: `, roomId);
                Logger.debug(`SDK execute sendMessageFile receive image: `, image); // files
                const base64 = yield Helper.convertFileToBase64(image);
                const imageLink = yield this.uploadMedia(base64);
                const payload = {
                    roomId: roomId,
                    body: image.name,
                    msgType: MessageTypeEnum.PDF,
                    url: imageLink.data.contentUri,
                    info: {
                        mimetype: image.type,
                        // w: 200,
                        // h: 200,
                        size: image.size,
                    }
                };
                const options = {
                    host: this.apiURL,
                    url: "/sdk/message",
                    method: "post",
                    headers: {
                        token: this.accessToken
                    },
                    payload: payload,
                    auth: this.apiURLBasicAuth,
                };
                // const imagesLink = await Promise.all(
                //     images.map(async (item: File) => {
                //         const base64 = await Helper.convertFileToBase64(item);
                //         return await this.uploadMedia(base64)
                //     })
                // )
                // await Promise.all(
                //     imagesLink.map(async (item: IResponse<IResponseApiUploadMedia>) => {
                //       options.payload = {
                //         roomId: roomId,
                //         // body: `${}.${}`
                //       } as IPayloadApiSendMessageImage;
                //       return await request(options)
                //     })
                // )
                Logger.debug(`SDK execute sendMessageFile using options`, options);
                const response = yield request(options);
                Logger.debug(`SDK execute sendMessageFile receive response`, response);
                return response;
            }
            catch (e) {
                Logger.error(`SDK execute sendMessageFile `, e);
            }
        });
    }
}
export { SDK };
