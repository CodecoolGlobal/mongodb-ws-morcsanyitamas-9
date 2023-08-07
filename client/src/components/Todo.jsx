import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { errorCodes, getAlertType } from "../utils/errorCodes";

const Todo = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const todosUpdater = props.todosUpdater;
  const todoUpdater = props.todoUpdater;

  const readOnlyIcons = props.readOnlyIcons;
  const [readonlyTextField, setReadonlyTextField] = useState(
    props.readonlyTextField
  );

  const theme = createTheme({
    typography: {
      fontFamily: ["Chilanka", "cursive"].join(","),
      fontSize: 15,
    },
  });

  function todoContextUpdater(todo) {
    setTodo(todo);
    if (typeof todoUpdater !== "undefined") {
      todoUpdater(todo);
    }
  }

  const handleClose = (event, reason) => {
    setOpenAlert(false);
    todosUpdater();
  };

  function handleEdit(id) {
    setReadonlyTextField(!readonlyTextField);
  }

  function handleDelete(id) {
    deleteTodo(id);
  }

  async function deleteTodo(id) {
    const data = await fetch(`http://localhost:4000/api/v1/todos/${id}`, {
      method: "DELETE",
    });
    const status = await data.json();
    console.log(status);

    setAlertMessage(status.status.message);
    const code = getAlertType(status.status.code, errorCodes.TODO_DELETION_OK);
    setAlertType(code);
    setOpenAlert(true);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card sx={{ border: 1, borderColor: "primary.main" }}>
          <CardContent>
            <TextField
              label="Title"
              variant="outlined"
              defaultValue={todo.title}
              onChange={(event) =>
                todoContextUpdater({ ...todo, title: event.target.value })
              }
              InputProps={{
                readOnly: readonlyTextField,
              }}
            />
          </CardContent>
          <CardContent>
            <TextField
              multiline
              label="Comment"
              variant="outlined"
              defaultValue={todo.comment}
              onChange={(event) =>
                todoContextUpdater({ ...todo, comment: event.target.value })
              }
              InputProps={{
                readOnly: readonlyTextField,
              }}
            />
          </CardContent>
          <CardContent>
            <Typography
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Created: {todo.createdAt}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              size="medium"
              aria-label="toogle todos"
              color="inherit"
              onClick={() => {
                if (!readOnlyIcons) {
                  handleEdit(todo._id);
                }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="medium"
              aria-label="toogle todos"
              color="inherit"
              onClick={() => {
                if (!readOnlyIcons) {
                  handleDelete(todo._id);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ThemeProvider>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert variant="filled" severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Todo;
