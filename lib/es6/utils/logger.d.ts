export declare class Logger {
    /**
     * @param {string} message
     */
    static info(message: string): void;
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static debug(message: string, content: string | object): void;
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static error(message: string, content: string | object): void;
    /**
     * @param {string} message
     * @param {string | object} content
     */
    static warn(message: string, content: string | object): void;
    /**
     * @param {array} content
     */
    static table(content?: string[] | number[]): void;
}
