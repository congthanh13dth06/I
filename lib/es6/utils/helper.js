export class Helper {
    static isEmpty(value) {
        if (typeof value === 'string') {
            return value.trim() === '';
        }
        return (value === undefined ||
            value === null ||
            (Object.keys(value).length === 0 && Object.getPrototypeOf(value) === Object.prototype) ||
            (Array.isArray(value) && value.length === 0));
    }
}
Helper.convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
