import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Todo from "../components/Todo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAlertType, errorCodes } from "../utils/errorCodes";

const CreateTodo = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    comment: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  function todoUpdater(todo) {
    setTodo(todo);
  }

  function handleSave() {
    createNewTodo(todo);
  }

  const handleClose = (event, reason) => {
    setOpenAlert(false);
    navigate("/");
  };

  async function createNewTodo(newTodo) {
    const result = await fetch("http://localhost:4000/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const status = await result.json();

    setAlertMessage(status.status.message);
    setAlertType(getAlertType(status.status.code, errorCodes.TODO_CREATION_OK));
    setOpenAlert(true);
  }

  function getEmptyTodo() {
    return {
      ...todo,
      createdAt: new Date().toLocaleDateString(),
    };
  }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      m={3}
    >
      <Grid item xs={3}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Create new Todo
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Todo
          todo={getEmptyTodo()}
          todoUpdater={todoUpdater}
          readonlyTextField={false}
          readOnlyIcons={true}
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Grid>
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
    </Grid>
  );
};

export default CreateTodo;
