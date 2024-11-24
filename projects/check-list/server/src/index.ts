// src/index.ts
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// test conection
app.get("/api/test", async (req, res) => {
  try {
    res.json({ message: "Connection established successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Create todo
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await prisma.todo.create({
      data: { text },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Update todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed, done } = req.body;

    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { text, completed, done },
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Delete multiple todos
app.delete("/api/todos", async (req, res) => {
  try {
    const { ids } = req.body;
    await prisma.todo.deleteMany({
      where: {
        id: { in: ids.map(Number) },
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
