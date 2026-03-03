// import fs from "node:fs/promises";
// import path from "node:path";
// // const pathtofile = new URL("../db.json", import.meta.url).pathname;
// const pathtofile = path.join("..", "db.json");
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const pathtofile = fileURLToPath(new URL("../db.json", import.meta.url));
export const readDB = async () => {
  const db = await fs.readFile(pathtofile, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(pathtofile, JSON.stringify(db, null, 2));
  return db;
};

export const addNote = async (note) => {
  const db = await readDB();
  // if (!db.ok) {
  //   throw new Error("Unable to read DB");
  // }
  db.notes.push(note);
  const res = await saveDB(db);
  // if (!res.ok) {
  //   throw new Error("Error in making updates to the DB");
  // }

  return note;
};
