const mongoose = require("mongoose");
const TodoModel = require("../models/Todo.js");
const errorCodes = require("../../utils/errorCodes.js");

function checkTodoCreationStatus(todo, newTodo) {
  if (newTodo.comment === todo.comment && newTodo.title === todo.title) {
    return errorCodes.TODO_CREATION_OK;
  } else {
    return errorCodes.TODO_CREATION_NOK;
  }
}

async function createTodo(todo) {
  // 5. TODO : create todo

  // in case of success
  return {
    status: checkTodoCreationStatus(todo, newTodo),
  };

  // in case of error
  return {
    status: errorCodes.TODO_CREATION_NOK,
  };
}

async function getTodos() {

  // 4. TODO : get todos

  // in case of success
  return {
    status: errorCodes.TODO_LOADING_OK,
    todos: todos,
  };

  // in case of error
  return {
    status: errorCodes.TODO_LOADING_NOK,
    todos: [],
  };
}

async function deleteTodo(id) {
  // 6. TODO : delete todo

  // in case of success
  return {
    status: errorCodes.TODO_DELETION_OK,
  };

  // in case of error
  return {
    status: errorCodes.TODO_DELETION_NOK,
  };

}

async function updateTodo(id, todo) {
    // 7. TODO : update todo
    
    // in case of success
    return {
      status: errorCodes.TODO_UPDATE_OK,
      todo: result,
    };

    // in case of error
    return {
      status: errorCodes.TODO_UPDATE_NOK,
      todo: null,
    };
  
}

module.exports = {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};
