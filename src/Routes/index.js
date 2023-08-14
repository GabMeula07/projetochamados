import { Route, Routes } from "react-router-dom";

import SignIn from "../pages/Singin";
import SignUp from "../pages/Singup";
import Dashboard from "../pages/Dashboard";

import Private from "./Private";
import Profile from "../pages/Profile";
import Costumers from "../pages/Costumers";
import New from "../pages/New";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />

      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />

      <Route
        path="/costumers"
        element={
          <Private>
            <Costumers />
          </Private>
        }
      />

      <Route
        path="/new"
        element={
          <Private>
            <New />
          </Private>
        }
      />

      <Route
        path="/new/:id"
        element={
          <Private>
            <New />
          </Private>
        }
      />
    </Routes>
  );
}

export default RoutesApp;
