import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, {
  dashboardActions,
  dashboardLoader,
} from "./components/Dashboard";
import ExpensesPage, {
  expenseAction,
  expensesLoader,
} from "./components/ExpensesPage";
import Error from "./components/Error";
import Main from "./components/Main";
import { logOutAction } from "./Logout";
// Libarary
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetPage, {
  budgetAction,
  budgetLoader,
} from "./components/BudgetPage";
import { deleteBudget } from "./components/deleteBudget";

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
          path: "expense",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expenseAction,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          errorElement: <Error />,
          action: budgetAction,
          // child already know every this about parent route
          children : [
            {
              path : "delete",
              action : deleteBudget,
              // created deleteBudget.js file to action
            }
          ]
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
