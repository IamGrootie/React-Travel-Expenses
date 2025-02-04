import "./App.css";
import RequireAuth from "./Components/RequireAuth";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Settings from "./Components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import CreateExpense from "./Components/Expenses/CreateExpense";
import Filters from "./Components/Expenses/Filters";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

export default function App() {
  const [toggleDarkMode, setToggleDarkMode] = React.useState(false);
  function handleDark(e) {
    setToggleDarkMode((prev) => !prev);
    localStorage.setItem("mode", toggleDarkMode ? "light" : "dark");
    e.preventDefault();
  }
  React.useEffect(() => {
    if (localStorage.getItem("mode") === "light") {
      setToggleDarkMode(false);
    } else {
      setToggleDarkMode(true);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navbar handleDark={handleDark} toggleDarkMode={toggleDarkMode} />
              <Dashboard toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        />

        <Route
          path="expenses"
          element={
            <RequireAuth>
              <Navbar handleDark={handleDark} toggleDarkMode={toggleDarkMode} />
              <Expenses toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        >
          <Route
            path="create-expense"
            element={
              <RequireAuth>
                <Navbar
                  handleDark={handleDark}
                  toggleDarkMode={toggleDarkMode}
                />
                <CreateExpense toggleDarkMode={toggleDarkMode} />
              </RequireAuth>
            }
          />

          <Route
            path="filters"
            element={
              <RequireAuth>
                <Navbar
                  handleDark={handleDark}
                  toggleDarkMode={toggleDarkMode}
                />
                <Filters toggleDarkMode={toggleDarkMode} />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="settings"
          element={
            <RequireAuth>
              <Navbar handleDark={handleDark} toggleDarkMode={toggleDarkMode} />
              <Settings toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}
