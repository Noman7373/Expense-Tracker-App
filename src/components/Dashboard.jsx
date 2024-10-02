import React from "react";
import { createBudget, createExpense, fetchData, waait } from "../Helper";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "./Intro";
import AddBudgetsForms from "./AddBudgetsForms";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
// Loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
};

//  action

export async function dashboardActions({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);

  // new User submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(value.userName));
      return toast.success(`Welcome ${value.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    createBudget({
      name: value.newBudget,
      amount: value.newBudgetAmount,
    });
    console.log("ammount is", amount);
    try {
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }

  if (_action === "createExpense") {
    // create Expense
    createExpense({
      name: value.newExpense,
      amount: value.newExpenseAmount,
      budgetId: value.newBudgetAmount,
    });
    console.log("ammount is", amount);
    try {
      return toast.success(`Expense ${value.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense");
    }
  }
}
const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetsForms />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budgets) => {
                    return <BudgetItem key={budgets.id} budgets={budgets} />;
                  })}
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Create a budget to get started!</p>
                <AddBudgetsForms />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
