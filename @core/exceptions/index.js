module.exports = {
  /**
   * @param {string} msg The error message
   * @param {number} excptionCode The exception code of the movie project to identifiy what is the case exception appears.
   */
  throwNotFoundExcption (msg, excptionCode) {
    return { message: msg, status: 404, code: excptionCode }
  },
  throwBadRequestException (msg, excptionCode) {
    return { message: msg, status: 400, code: excptionCode }
  },
  throwUpdateWithTheCurrentValueException (msg, excptionCode) {
    return { message: msg, status: 400, code: excptionCode }
  },
  throwParameterEexcpetion (msg, params, excptionCode) {
    return { message: msg, status: 400, code: excptionCode, parameters: params }
  }
}
