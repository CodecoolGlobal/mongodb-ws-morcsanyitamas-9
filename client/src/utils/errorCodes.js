const errorCodes = {
  TODO_CREATION_OK: {
    code: 0,
    message: "Todo successfully created!",
  },
  TODO_CREATION_NOK: {
    code: 1,
    message: "Todo creation failed!",
  },
  TODO_LOADING_OK: {
    code: 2,
    message: "Todo(s) successfully loaded!",
  },
  TODO_LOADING_NOK: {
    code: 3,
    message: "Todo(s) loading failed!",
  },
  TODO_DELETION_OK: {
    code: 4,
    message: "Todo successfully deleted!",
  },
  TODO_DELETION_NOK: {
    code: 5,
    message: "Todo deletion failed!",
  },
  TODO_UPDATE_OK: {
    code: 6,
    message: "Todo successfully updated!",
  },
  TODO_UPDATE_NOK: {
    code: 7,
    message: "Todo update failed!",
  },
};

function checkStatus(statusCode, expectedStatus) {
  if(expectedStatus.code === statusCode){
    return true;
  }
  return false;
}

function getAlertType(statusCode, expectedStatus) {
  if(checkStatus(statusCode, expectedStatus)){
    return "success";
  }
  return "error";
}

module.exports = {
  errorCodes,
  checkStatus,
  getAlertType,
};
