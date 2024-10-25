import { render, fireEvent } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import ExpenseList from "../components/Expense/ExpenseList";
import Remaining from "../components/Remaining";
import ExpenseTotal from "../components/Expense/ExpenseTotal";

describe("Budget Balance Verification", () => {
  it("should validate that Budget = Remaining Balance + Total Expenditure", () => {
    const { getByText, getByLabelText } = render(
      <AppProvider>
        <AddExpenseForm />
        <ExpenseList />
        <Remaining />
        <ExpenseTotal />{" "}
      </AppProvider>
    );

    // Initial budget should be 1000, total spent is 0, remaining is 1000
    expect(getByText("Remaining: $1000")).toBeInTheDocument();
    expect(getByText("Spent so far: $0")).toBeInTheDocument();

    // Simulate adding an expense
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(getByLabelText(/cost/i), { target: { value: "200" } });
    fireEvent.click(getByText(/save/i));

    expect(getByText("Remaining: $800")).toBeInTheDocument();
    expect(getByText("Spent so far: $200")).toBeInTheDocument();

    // Verify that Budget = Remaining + Spent
    const remaining = 800;
    const spent = 200;
    const budget = 1000;
    expect(remaining + spent).toBe(budget);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Entertainment" },
    });
    fireEvent.change(getByLabelText(/cost/i), { target: { value: "100" } });
    fireEvent.click(getByText(/save/i));

    expect(getByText("Remaining: $700")).toBeInTheDocument();
    expect(getByText("Spent so far: $300")).toBeInTheDocument();

    // Verify the Budget
    const newRemaining = 700;
    const newSpent = 300;
    expect(newRemaining + newSpent).toBe(budget);
  });
});
