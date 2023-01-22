import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleList from "./pages/singleList/SingleList";
import New from "./pages/new/New";
import NewLand from "./pages/newLand/NewLand";
import NewList from "./pages/newList/NewList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { houseInputs, landInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import SingleLand from "./pages/singleLand/SingleLand";
import Tickets from "./pages/Tickets/Tickets";
import SingleTicket from "./pages/SingleTicket/SingleTicket";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="houses">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List title="Add New House" />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":houseId"
                element={
                  <ProtectedRoute>
                    <SingleList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewList inputs={houseInputs} title="Add New House" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="lands">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List title="Add New Land" />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":landId"
                element={
                  <ProtectedRoute>
                    <SingleLand />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewLand inputs={landInputs} title="Add New Land" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="payments">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List title="Add New Payment" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tickets">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Tickets />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleTicket />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
