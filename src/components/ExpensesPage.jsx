import { useLoaderData } from "react-router-dom";
import { fetchData } from "../Helper";
import Table from "./Table";


export const expensesLoader = () => {
  const expenses = fetchData("Expenses");
  return { expenses };
};
const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>{" "}
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>{" "}
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses</p>
      )}
    </div>
  );
};

export default ExpensesPage;
