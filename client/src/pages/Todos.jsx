import React from "react";
import Todo from "../components/Todo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { checkStatus, errorCodes } from "../utils/errorCodes";

const Todos = (props) => {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0);

  const hide = props.hide;

  useEffect(() => {
    async function getTodos() {
      const data = await fetch("http://localhost:4000/api/v1/todos");
      const todos = await data.json();
      if (checkStatus(todos.status.code, errorCodes.TODO_LOADING_OK)) {
        console.log(todos.status.message);
        setTodos(todos.todos);
      }
    }
    getTodos();
  }, [counter]);

  function todosUpdater() {
    setCounter(counter + 1);
  }

  return (
    <div>
      {!hide ? (
        <div>
          <Box m={3} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {todos.map((todo) => (
                <Grid item xs={2} sm={4} md={4} key={todo._id}>
                  <Todo
                    todo={todo}
                    readonlyTextField={true}
                    readOnlyIcons={false}
                    todosUpdater={todosUpdater}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : (
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
          textAlign={"center"}
        >
          Your Todos are hidden!
        </Typography>
      )}
    </div>
  );
};

export default Todos;
