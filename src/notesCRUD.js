import { readDB, saveDB, addNote } from "./db.js";

export const newNote = async (note, tags) => {
  const task = {
    tags,
    id: Date.now(),
    content: note,
  };
  await addNote(task);
  return note;
};

export const getAllNotes = async () => {
  const { notes } = await readDB();
  return notes;
};

export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNote = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNote });
    return id;
  }
};

export const removeAll = async () => {
  await saveDB({ notes: [] });
};
