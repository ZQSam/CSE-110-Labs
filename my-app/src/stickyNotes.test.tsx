import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import React from "react";
import { dummyNotesList } from "./constants";

// given tests from the document
test("renders create note form", () => {
  render(<StickyNotes />);
  const createNoteButton = screen.getByText("Create Note");
  expect(createNoteButton).toBeInTheDocument();
});

describe("StickyNotes - Read Test", () => {
  test("displays all the notes that are created", () => {
    render(<StickyNotes />);

    // Check if all dummy notes are displayed on the page
    dummyNotesList.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });
  });
});

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

describe("StickyNotes - Update Test", () => {
  test("updates the note when changes are made and submitted", () => {
    render(<StickyNotes />);

    // Create a new note
    const titleInput = screen.getByPlaceholderText(/note title/i);
    const contentInput = screen.getByPlaceholderText(/note content/i);
    const createButton = screen.getByText(/create note/i);

    fireEvent.change(titleInput, { target: { value: "Test Note" } });
    fireEvent.change(contentInput, {
      target: { value: "This is a test note" },
    });
    fireEvent.click(createButton);

    // Pick all edit since there is no difference
    const editButtons = screen.getAllByText(/edit/i);
    const firstEditButton = editButtons[0];

    fireEvent.click(firstEditButton);

    const updatedTitle = "Updated Test Note";
    fireEvent.change(titleInput, { target: { value: updatedTitle } });
    fireEvent.click(createButton); // Save the update

    // Check if the note is updated
    expect(screen.getByText(updatedTitle)).toBeInTheDocument();
  });
});

describe("StickyNotes - Delete Test", () => {
  test("deletes a note when the delete button is clicked", () => {
    render(<StickyNotes />);

    // Create a new note
    const titleInput = screen.getByPlaceholderText(/note title/i);
    const contentInput = screen.getByPlaceholderText(/note content/i);
    const createButton = screen.getByText(/create note/i);

    fireEvent.change(titleInput, { target: { value: "Test" } });
    fireEvent.change(contentInput, { target: { value: "Null Note" } });
    fireEvent.click(createButton);

    // Check that the note is present
    expect(screen.getByText("Test Note")).toBeInTheDocument();

    const deleteButtons = screen.getAllByText(/x/i);
    const firstDeleteButton = deleteButtons[0];

    // Click the first delete button
    fireEvent.click(firstDeleteButton);

    // Check if the note is deleted
    expect(screen.queryByText("Test Note")).not.toBeInTheDocument();
  });
});
