class Service {
  static handleSuccess = ({ data = undefined, message = "Request Successful", statusCode = 200 }) => {
    return {
      success: true,
      data,
      message,
      statusCode,
    };
  };

  static handleError = ({ message = "Request failed", statusCode = 500 }) => {
    return {
      success: false,
      message,
      statusCode,
    };
  };
}

module.exports = Service;
