import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Redirect from "../pages/Redirect";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App";


const router = createBrowserRouter([
    { path: "/", element: <App /> },  
    { path: 'login', element: <Login/> },
    { path: 'signup', element:<Signup/>},
    {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
    { path: "r/:shortCode", element: <Redirect /> },
]);

export default router;