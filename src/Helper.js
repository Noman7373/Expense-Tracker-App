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
