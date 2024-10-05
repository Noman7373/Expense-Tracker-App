// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//  delete user
export async function deleteUser() {
  return localStorage.clear();
}

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

// // Function to track similar expenses
// export const trackSemilarExpenses = ({ name, amount, createdAt }) => {
//   const getExpenseLS = fetchData("Expenses") ?? []; // Fetching expenses from local storage

//   const filterData = getExpenseLS.find((expense) => expense.name === name);
//   if (filterData) {
//     filterData.amount += amount;
//     createdAt = createdAt;
//   } else {
//     const newExpense = { name, amount, createdAt };
//     getExpenseLS.push(newExpense);
//   }

//   localStorage.setItem("Expenses", JSON.stringify(getExpenseLS));
//   return filterData || { name, amount, createdAt };
// };

// Get all items from localstorage
export const getAllMatchingItms = ({ budgets, id, value }) => {
  const data = fetchData(budgets) ?? [];

  const filterData = data.filter((items) => items[id] === value);

  return filterData;
};

// Delete expense
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
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
  const expenses = fetchData("Expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.id === budgetId) return acc;

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

export const formatData = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};

// generate Randomcolor
const generateRandomColor = () => {
  const existBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existBudgetLength * 34} 65% 50%`;
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));
