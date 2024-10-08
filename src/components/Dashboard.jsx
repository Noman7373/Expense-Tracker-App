import React from "react";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../Helper";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "./Intro";
import AddBudgetsForms from "./AddBudgetsForms";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import Table from "./Table";
// Loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("Expenses");
  return { userName, budgets, expenses };
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

  // createBudget
  if (_action === "createBudget") {
    const name = value.newBudget;
    const amount = value.newBudgetAmount;
    createBudget({
      name: name,
      amount: amount,
    });
    try {
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }

  // create Expense
  if (_action === "createExpense") {
    const name = value.newExpense;
    const amount = value.newExpenseAmount;
    const budgetIt = value.newBudgetAmount;
    createExpense({
      name: name,
      amount: amount,
      budgetId: budgetIt,
    });
    try {
      return toast.success(`Expense ${value.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating your expense");
    }
  }

  // Delete Expense
  if (_action === "deleteExpense") {
    deleteItem({
      key: "Expenses",
      id: value.expenseId,
    });
    try {
      return toast.success(`Expense deleted!`);
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
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
                    // console.log("Dashboard", budgets.amount);

                    return <BudgetItem key={budgets.id} budgets={budgets} />;
                  })}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expense" className="btn btn--dark">
                        View All Expenses
                      </Link>
                    )}
                  </div>
                )}
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
