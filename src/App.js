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
    e.preventDefault();
  }

  return (
    <div className="App">
      <Navbar handleDark={handleDark} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        />

        {/* add ternary to hide Expense if create-expense = true and nest inside*/}
        <Route
          path="expenses"
          element={
            <RequireAuth>
              <Expenses toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        >
          <Route
            path="create-expense"
            element={
              <RequireAuth>
                <CreateExpense toggleDarkMode={toggleDarkMode} />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="filters"
          element={
            <RequireAuth>
              <Filters toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings toggleDarkMode={toggleDarkMode} />
            </RequireAuth>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}
