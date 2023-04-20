class ResponseHelper {
  static resOk(data) {
    return {
      success: true,
      data,
      error: null,
    };
  }
  static resFail(error) {
    return {
      success: false,
      data: null,
      error,
    };
  }
}

module.exports = ResponseHelper;
