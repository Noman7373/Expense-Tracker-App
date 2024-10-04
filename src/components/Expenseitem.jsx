import React from "react";
import { formatCurrency, formatData, getAllMatchingItms } from "../Helper";
// import { Link } from "react-router-dom";

const Expenseitem = ({ expense }) => {
  const budget = getAllMatchingItms({
    budgets: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  console.log(budget);

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatData(expense.createdAt)}</td>
    </>
  );
};

export default Expenseitem;
