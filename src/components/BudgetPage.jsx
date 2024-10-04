import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItms } from "../Helper";
import BudgetItem from "./BudgetItem";
import AddExpenseForm from "./AddExpenseForm";
import Table from "./Table";
import { toast } from "react-toastify";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItms({
    budgets: "budgets",
    key: "id",
    value: params.budgetId,
  })[0];

  const expense = await getAllMatchingItms({
    budgets: "Expenses",
    key: "budgetId",
    value: params.budgetId,
  });

  if (!budget) {
    throw new Error("The budget you trying to find deos not exist!");
  }

  return { budget, expense };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);

  if (_action === "createExpense") {
    // create Expense
    const name = value.newExpense;
    const amount = value.newExpenseAmount;
    const budgetIt = value.newBudgetAmount;
    createExpense({
      name: name,
      amount: amount,
      budgetId: budgetIt,
    });
    try {
      return toast.success(`Expense ${value.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense");
    }
  }

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

const BudgetPage = () => {
  const { budget, expense } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budgets={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expense && expense.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name} </span>
            Expenses
          </h2>
          <Table expenses={expense} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
