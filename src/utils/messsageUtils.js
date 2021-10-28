export const DEFAULT_ERROR_MESSAGE = 'There are profane words: {words}. Please fix them.'

export const messageFormatter = (value, args) => {
    let str = value;
    if (args) {
        for (const key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
}