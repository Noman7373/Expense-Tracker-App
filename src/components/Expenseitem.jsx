import React from "react";
import { formatCurrency, formatData } from "../Helper";

const Expenseitem = ({ expense }) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatData(expense.createdAt)}</td>
    </>
  );
};

export default Expenseitem;
