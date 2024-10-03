import React from "react";

const Table = ({ expenses }) => {
  return (
    <div className="table">
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>{expense.name}</tr>
        ))}
      </tbody>
    </div>
  );
};

export default Table;
