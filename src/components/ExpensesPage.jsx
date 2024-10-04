import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../Helper";
import Table from "./Table";
import { toast } from "react-toastify";

export async function expensesLoader() {
  const expenses = fetchData("Expenses");
  return { expenses };
}

export async function expenseAction({ request }) {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    // Delete Expense
    deleteItem({
      key: "Expenses",
      id: value.expenseId,
    });
    try {
      return toast.success(`Expense deleted!`);
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}
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
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
