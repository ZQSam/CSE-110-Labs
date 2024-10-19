import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { ToDoList } from './toDoList';
import { dummyGroceryList } from './constants';

// Check if all items are displayed
describe('ToDoList - Read Test', () => {
  test('displays all the items in the list', () => {
    render(<ToDoList />);
    dummyGroceryList.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});

describe('ToDoList - Checked Items Count Test', () => {
  test('displays the correct number of items checked', () => {
    render(<ToDoList />);
    expect(screen.getByText(/items bought: 0/i)).toBeInTheDocument();

    // Check the "Apples" checkbox
    const applesCheckbox = screen.getByLabelText(/Apples/i);
    fireEvent.click(applesCheckbox);
    expect(screen.getByText(/items bought: 1/i)).toBeInTheDocument();

    // Check the "Bananas" checkbox
    const bananasCheckbox = screen.getByLabelText(/Bananas/i);
    fireEvent.click(bananasCheckbox);
    expect(screen.getByText(/items bought: 2/i)).toBeInTheDocument();
  });
});

