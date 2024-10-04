import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItms } from "../Helper";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.budgetId,
    });
    console.log("key is", key);

    const associatedExpenses = getAllMatchingItms({
      budgets: "Expenses",
      key: budgetId,
      value: params.budgetId,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "Expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted succussfully!");
  } catch (error) {
    throw new Error(`There was a problem delete your budget}`);
  }
  return redirect("/");
}
