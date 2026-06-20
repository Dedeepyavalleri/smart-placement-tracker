import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Companies from "./pages/Companies";
import Applications from "./pages/Applications";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
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
        path="/companies"
        element={
            <ProtectedRoute>
                <Companies />
            </ProtectedRoute>
        }
        />
        
        <Route
        path="/applications"
        element={
            <ProtectedRoute>
                <Applications />
            </ProtectedRoute>
        }
        />

        <Route
        path="/notes"
        element={
            <ProtectedRoute>
                <Notes />
            </ProtectedRoute>
        }
         />

      </Routes>
       <ToastContainer />
    </BrowserRouter>
  );
}

export default App;