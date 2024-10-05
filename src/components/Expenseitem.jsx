import { TrashIcon } from "@heroicons/react/16/solid";
import { formatCurrency, formatData, getAllMatchingItms } from "../Helper";
import { Link, useFetcher } from "react-router-dom";

const Expenseitem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItms({
    budgets: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatData(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            style={{
              "--accent": budget.color,
            }}
            to={`/budgets/${budget.id}`}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            className="btn btn--warning"
            type="submit"
            aria-label={`Delete ${expense.id}`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default Expenseitem;
