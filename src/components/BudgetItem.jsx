import { formatCurrency, formatPercentage, totalBudgetCalculation } from "../Helper";

const BudgetItem = ({ budgets }) => {
  const { id, name, amount, color } = budgets;
  const spent = totalBudgetCalculation(id);
  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} Spent</small>
        <small>... Remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
