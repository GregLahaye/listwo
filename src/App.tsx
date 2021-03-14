import React, { useReducer } from "react";
import "./App.css";
import { Dashboard } from "./Dashboard";
import { Authenticate } from "./Authenticate";
import { AnonymousRoute } from "./AnonymousRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserContext, userReducer, initial } from "./UserContext";
import { BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  const [state, dispatch] = useReducer(userReducer, initial);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <AnonymousRoute path="/authenticate" element={<Authenticate />} />
          <ProtectedRoute path="/lists" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
