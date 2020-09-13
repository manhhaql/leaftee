import * as responseCode from '../constant/response_code';

class ErrorParser {
    static handleJoiError(error) {
        return {
            code: responseCode.ERR_VALIDATION,
            error: error.details[0].message
        }
    }
};

export default ErrorParser;