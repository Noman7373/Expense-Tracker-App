import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, {
  dashboardActions,
  dashboardLoader,
} from "./components/Dashboard";
import Error from "./components/Error";
import Main from "./components/Main";
import { logOutAction } from "./Logout";
// Libarary
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: dashboardLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardActions,
          errorElement: <Error />,
        },
        {
          path: "logout",
          action: logOutAction,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
