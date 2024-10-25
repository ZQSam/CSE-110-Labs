import { render, fireEvent, waitFor, within } from "@testing-library/react";
import { AppProvider } from "../context/AppContext";
import ExpenseList from "../components/Expense/ExpenseList";
import Remaining from "../components/Remaining";
import ExpenseTotal from "../components/Expense/ExpenseTotal";

describe("Expense Deletion", () => {
  it("should delete an expense and update the total spent and remaining balance", async () => {
    // Mock initial expenses
    const initialExpenses = [
      { id: "1", name: "Groceries", cost: 200 },
      { id: "2", name: "Entertainment", cost: 100 },
    ];

    const { getByText, queryByText } = render(
      <AppProvider initialExpenses={initialExpenses}>
        <ExpenseList />
        <Remaining />
        <ExpenseTotal />
      </AppProvider>
    );

    expect(getByText("Groceries")).toBeInTheDocument();
    expect(getByText("Entertainment")).toBeInTheDocument();

    expect(getByText("Remaining: $700")).toBeInTheDocument();
    expect(getByText("Spent so far: $300")).toBeInTheDocument();

    // const deleteButton = getByText(/x/i);

    const groceriesListItem = getByText("Groceries").closest("li");

    if (!groceriesListItem) {
      throw new Error("Groceries list item not found");
    }

    const { getByText: getByTextWithin } = within(groceriesListItem);
    const deleteButton = getByTextWithin(/x/i);

    fireEvent.click(deleteButton);

    // Wait for the item to be removed from the DOM
    await waitFor(() => {
      expect(queryByText("Groceries")).not.toBeInTheDocument();
    });

    // After deleting "Groceries", verify the remaining balance and total spent updates correctly
    expect(getByText("Remaining: $900")).toBeInTheDocument();
    expect(getByText("Spent so far: $100")).toBeInTheDocument();
  });
});
