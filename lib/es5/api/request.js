"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const helper_1 = require("../utils/helper");
const axiosInstance = axios_1.default.create();
let errorMessage = 'System exception!';
axiosInstance.interceptors.request.use(config => {
    return config;
}, error => {
    void Promise.reject(error);
});
axiosInstance.interceptors.response.use(config => {
    return config === null || config === void 0 ? void 0 : config.data;
}, error => {
    var _a;
    // if needs to navigate to login page when request exception
    errorMessage = ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.includes('Network Error'))
        ? 'Network error, please check your network!'
        : error === null || error === void 0 ? void 0 : error.message;
    return {
        status: false,
        message: errorMessage,
        result: null,
    };
});
/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
const request = (_a) => __awaiter(void 0, [_a], void 0, function* ({ method, url, payload, params, headers, host, timeout, auth, maxBodyLength, }) {
    const options = {
        method,
        headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
        baseURL: host,
        url,
        data: payload,
        params,
        timeout: timeout !== null && timeout !== void 0 ? timeout : 30000,
    };
    if (!helper_1.Helper.isEmpty(auth)) {
        options.auth = auth;
    }
    if (!helper_1.Helper.isEmpty(maxBodyLength)) {
        options.maxBodyLength = maxBodyLength;
    }
    return yield axiosInstance.request(options);
});
exports.request = request;
