import { render, fireEvent } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import ExpenseList from "../components/Expense/ExpenseList";
import Remaining from "../components/Remaining";

describe("Expense Creation", () => {
  it("add new expense and update the total spent and remaining balance", () => {
    const { getByLabelText, getByText } = render(
      <AppProvider>
        <AddExpenseForm />
        <ExpenseList />
        <Remaining />
      </AppProvider>
    );

    // Simulate adding a new expense
    const nameInput = getByLabelText(/name/i);
    const costInput = getByLabelText(/cost/i);
    const saveButton = getByText(/save/i);

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "50" } });
    fireEvent.click(saveButton);

    // Check if the expense is added
    expect(getByText("Groceries")).toBeInTheDocument();
    expect(getByText("Remaining: $950")).toBeInTheDocument();
  });
});
