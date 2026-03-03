# 📝 CLI Notes – Node.js Command Line Note Manager

A modular and scalable **Command Line Note Taking Application** built using **Node.js** and **Yargs**.
This project follows a clean layered architecture separating CLI logic, business logic, and database operations.

---

## 🚀 Features

- Create notes with tags
- Read all notes
- Filter notes based on specific keywords
- Delete a particular note
- Delete all notes
- Persistent storage using JSON
- Modular architecture
- Yargs-powered CLI commands

---

## 🏗️ Architecture Overview

The project follows a clean separation of concerns:

```
CLI Layer (command.js)
        ↓
Business Logic Layer (notesCRUD.js)
        ↓
Database Layer (db.js)
        ↓
JSON Storage (db.json)
```

### 🔹 Layer Responsibilities

- **command.js**
  - Defines CLI commands using `yargs`
  - Parses arguments
  - Calls corresponding CRUD functions

- **notesCRUD.js**
  - Acts as an interface between CLI and database
  - Contains note-related logic
  - Validates and processes note data

- **db.js**
  - Handles reading/writing to `db.json`
  - Abstracts file system operations

- **db.json**
  - Stores notes in structured format:

```json
{
  "notes": [
    {
      "id": 1709482100000,
      "tags": ["work", "urgent"],
      "content": "Complete CLI project"
    }
  ]
}
```

---

## 📂 Project Structure

```
CLI/
│
├── node_modules/
├── src/
│   ├── command.js      # Yargs command definitions
│   ├── db.js           # Database layer (FS operations)
│   ├── notesCRUD.js    # Business logic layer
│
├── db.json             # JSON database
├── index.js            # Entry point
├── package.json
└── .gitignore
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/cli-notes.git
cd cli-notes
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🧭 Usage

All commands are handled using **yargs**.

---

### ➕ Create a Note

```bash
task new "Hello"

task new "Clean your room" -t "imp, now"
```

---

### 📖 List All Notes

```bash
task all
```

---

### Filter Notes

```bash
task find "your"
```

---

### Removing note by id

```bash
task remove 1772525412241
```

---

### Remove all notes

```bash
task clean
```

---

## 🛠️ Tech Stack

- **Node.js**
- **Yargs** (CLI argument parsing)
- **ES Modules**
- **fs/promises**
- JSON-based storage

---

## 🧠 Design Highlights

- Layered architecture
- Clean separation of concerns
- Scalable structure (easy to extend)
- Async/await file operations
- CLI-driven user interaction
- Extensible tagging system

---

## 📈 Future Improvements

- Add timestamps (createdAt / updatedAt)
- Colored CLI output (chalk)
- Unit testing with Jest
- Convert to global npm package

---

## 👩‍💻 Author

**Kavya Gupta**
MERN Stack Developer | System Design Learner | Backend Enthusiast

---

---
