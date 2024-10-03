import {
  formatCurrency,
  formatPercentage,
  totalBudgetCalculation,
} from "../Helper";

const BudgetItem = ({ budgets }) => {
  const { id, name, amount, color } = budgets;
  // console.log("BudgetItems",amount);
  const spent = totalBudgetCalculation(id);
  console.log("spent amount", spent);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      {/* {console.log(amount)} */}
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
