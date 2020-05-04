class Exception {
  // JS DOC
  /**
   * @param {string} msg The error message will appear
   * @param {number} statusCode The errors status code description
   * @param {string} codeExp A random string to represetn the exception
   */
  constructor(msg, statusCode, codeExp) {
    this.msg = msg;
    this.statusCode = statusCode;
    this.codeExp = codeExp;
  }
}

exports.Exception = Exception;
