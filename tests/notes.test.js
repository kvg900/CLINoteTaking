import { beforeEach, expect, jest, test } from "@jest/globals";
// import { addNote, readDB, saveDB } from "../src/db.js";

jest.unstable_mockModule("../src/db.js", () => ({
  saveDB: jest.fn(),
  addNote: jest.fn(),
  readDB: jest.fn(),
}));
//jest.fn()=>return a spy that keeps info about how many times this function is calles, who called it and we can apply expectations on this

const { saveDB, addNote, readDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } =
  await import("../src/notesCRUD.js");

beforeEach(() => {
  saveDB.mockClear();
  addNote.mockClear();
  readDB.mockClear();
});
//this is used to cleanup any previous test results before going to the next test

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["tag1", "tag2"];
  const data = {
    tags,
    id: 1,
    content: note,
  };
  addNote.mockResolvedValue(data);

  const result = await newNote(note, tags);
  expect(result.content).toEqual(data.content);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  readDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNote does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
  saveDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});
