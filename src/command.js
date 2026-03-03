import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  findNotes,
  getAllNotes,
  newNote,
  removeAll,
  removeNote,
} from "./notesCRUD.js";

yargs(hideBin(process.argv))
  .command(
    "new <task>",
    "create a new note",
    (yargs) => {
      return yargs.positional("task", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.task, tags);
      console.log("New note ", note);
      console.log(argv);
    },
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const allNotes = await getAllNotes();
      // console.log(allNotes);
      // console.log(argv);
      allNotes.map((note, idx) => {
        console.log(`Task ${idx + 1}: ${note.content}`);
      });
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      console.log(notes);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = argv.id;
      removeNote(argv.id);
      console.log(`Note with id=${id} has been removed`);
    },
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {},
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAll();
      console.log("DB cleared");
    },
  )
  .demandCommand(1)
  .parse();

/*
  A positional argument in yargs is an argument provided in the command line interface (CLI) that is parsed based on its specific position or order, rather than a preceding flag (like --name or -n). 
problemsolvingwithpython.com
problemsolvingwithpython.com
 +1
Key Characteristics
Order Matters: Positional arguments are assigned to parameters based on their sequence in the command line.
Command Context: They are typically defined within the context of a specific command using the .command() method.
Syntax in yargs: You define them in the command string itself using angle brackets for required arguments (<required>) and square brackets for optional ones ([optional]). For example, my-cli copy <source> [destination] defines a required source and an optional destination.
Configuration: You can configure positional arguments further using the .positional() method within the command's builder function to add descriptions, specify types, and set default values, just like flagged options.
Access: In your application code, yargs automatically parses these arguments, making their values available as properties on the argv object, using the name you defined. 
  */
