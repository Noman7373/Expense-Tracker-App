import { toast } from "react-toastify";
import { deleteItem, fetchData, getAllMatchingItms } from "../Helper";
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  const budgets = fetchData("budgets");
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
  

    const associatedExpenses = getAllMatchingItms({
      budgets: "Expenses",
      value: params.id,
    });
  

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "Expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted succussfully!");
  } catch (error) {
    throw new Error(`There was a problem delete your ${budgets}`);
  }
  return redirect("/");
}
