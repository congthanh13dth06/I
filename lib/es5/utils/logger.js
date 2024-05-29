"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const getTime = () => {
    const date = new Date();
    const timeNow = ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
    const today = ((date.getDate() < 10) ? "0" : "") + date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear();
    return `${timeNow} ${today}`;
};
class Logger {
    /**
     * @param {string} message
     */
    static info(message) {
        // if (envValue !== 'production') {
        //   const log = `[${getTime()}][INFO] ${message}`;
        //   console.log(`%c ${log}`, 'color: #5D9C59');
        // }
        const log = `[${getTime()}][INFO] ${message}`;
        console.log(`%c ${log}`, 'color: #5D9C59');
    }
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static debug(message, content) {
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
        // if (envValue !== 'production') {
        //   const log = `[${getTime()}][DEBUG] ${message} ${content}`;
        //   console.log(`%c ${log}`, 'color: #2F58CD');
        // }
        const log = `[${getTime()}][DEBUG] ${message} ${content}`;
        console.log(`%c ${log}`, 'color: #2F58CD');
    }
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static error(message, content) {
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
        // if (envValue !== 'production') {
        //   const log = `[${getTime()}][ERROR] ${message} ${content}`;
        //   console.log(`%c ${log}`, 'color: #EB455F');
        // }
        const log = `[${getTime()}][ERROR] ${message} ${content}`;
        console.log(`%c ${log}`, 'color: #EB455F');
    }
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static warn(message, content) {
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
        // if (envValue !== 'production') {
        //   const log = `[${getTime()}][WARN] ${message} ${content}`;
        //   console.log(`%c ${log}`, 'color: #FF7F3F');
        // }
        const log = `[${getTime()}][WARN] ${message} ${content}`;
        console.log(`%c ${log}`, 'color: #FF7F3F');
    }
    /**
     * @param {array} content
     */
    static table(content) {
        // if (envValue !== 'production') {
        //   console.table(content);
        // }
        console.table(content);
    }
}
exports.Logger = Logger;
