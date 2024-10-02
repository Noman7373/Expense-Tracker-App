// color
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

// generate Randomcolor
const generateRandomColor = () => {
  const existBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existBudgetLength * 34} 65% 50%`;
};

// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
//  delete user
export const deleteUser = () => {
  return localStorage.clear();
};

// create Budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudget = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};

// Create Expense

export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("Expenses") ?? [];
  return localStorage.setItem(
    "Expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// Formatting Stuff

export const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD", // or your desired currency code
  });
};

// Total spent

export const totalBudgetCalculation = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// format percentage

export const formatPercentage = (value) => {
  return value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0, // or your desired currency code
  });
};
