import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateTodo from "./pages/CreateTodo";
import Todos from "./pages/Todos";
import React from "react";
import { useState } from "react";


function App() {
  const [hide, setHide] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout hide={hide} setHide={setHide} />}>
          <Route index element={<Todos hide={hide}/>}></Route>
          <Route path="/create-todo" element={<CreateTodo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;