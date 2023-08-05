/**
 * Class to encapsulate custom error data
 */
export default class CustomErrors extends Error {
    /**
     * Create a custom error.
     * @param {string} [name="Error"] - The name of the error.
     * @param {string} message - The error message.
     * @param {Object} [cause] - The cause of the error.
     * @param {number} [status=1] - The status code of the error.
     */
    constructor(name = "Error", message, cause, status = 1) {
        super(message);
        this.name = name;
        this.cause = cause;
        this.status = status;
    }
}
