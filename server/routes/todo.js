/*
 * /api/v1/todo
 */
const express = require("express");
const router = express.Router();
const { createTodo, getTodos, deleteTodo, updateTodo } = require("../data/controllers/todo.js");

router.get("/", async (req, res) => {
  const todos = await getTodos();
  res.send(todos);
});

router.post("/", async (req, res) => {
    const result = await createTodo(req.body);
    res.send(result);
  });

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTodo(id);
  res.send(result);
})

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  const result = await updateTodo(id, todo);
  res.send(result);
})

module.exports = router;
