import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, name } = req.body;

    if (!name || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        name,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params;
    const index = expenses.findIndex(expense => expense.id === id);

    if (index !== -1) {
        expenses.splice(index, 1); // Remove the expense from the array
        res.status(202).json({ message: "Expense deleted successfully." });
    } 
    else {
        res.status(404).json({ message: "Expense not found." });
    }
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}