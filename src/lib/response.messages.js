const responseMessages = {
    // General FAILURE Response Message
    errorResponseMessage: (code, error = '') => {
        const message = {
            status_code: code,
            data: error
        };
        return message;
    },
    // General SUCCESS Response Message
    successResponseMessage: (code, data = '') => {
        const message = {
            status_code: code,
            data: data
        };
        return message;
    }
};

module.exports = responseMessages;