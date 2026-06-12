import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import Interview from "./pages/Interview";
import HRInterview from "./pages/HRInterview";
import Result from "./pages/Result";
import History from "./pages/History";
import Resume from "./pages/Resume";
import Admin from "./pages/Admin";

function App() {

  return (
    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr-interview/:id"
          element={
            <ProtectedRoute>
              <HRInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result/:id"
  element={
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  }
/>
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume"
  element={
    <ProtectedRoute>
      <Resume />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

      </Routes>

    </>
  );
}

export default App;