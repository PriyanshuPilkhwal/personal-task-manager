const express = require('express');
const router = express.Router();
const db = require('./db');

// ─── GET /api/tasks

router.get('/tasks', (req, res) => {
  try {
    const { status } = req.query;

    let stmt;
    if (status && ['active', 'completed'].includes(status)) {
      stmt = db.prepare(
        'SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC'
      );
      const tasks = stmt.all(status);
      return res.json(tasks);
    }

    stmt = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');
    const tasks = stmt.all();
    res.json(tasks);
  } catch (err) {
    console.error('[GET /tasks]', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// ─── POST /api/tasks 

router.post('/tasks', (req, res) => {
  try {
    const { title, description = null, due_date = null } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const stmt = db.prepare(
      'INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)'
    );
    const result = stmt.run(title.trim(), description, due_date);

    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('[POST /tasks]', err.message);
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// ─── PUT /api/tasks/:id 

router.put('/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    if (status && !['active', 'completed'].includes(status)) {
      return res.status(400).json({ error: "Status must be 'active' or 'completed'." });
    }

    const updatedTitle       = title       !== undefined ? title.trim()  : existing.title;
    const updatedDescription = description !== undefined ? description    : existing.description;
    const updatedDueDate     = due_date    !== undefined ? due_date       : existing.due_date;
    const updatedStatus      = status      !== undefined ? status         : existing.status;

    const stmt = db.prepare(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?'
    );
    stmt.run(updatedTitle, updatedDescription, updatedDueDate, updatedStatus, id);

    const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    res.json(updatedTask);
  } catch (err) {
    console.error('[PUT /tasks/:id]', err.message);
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

// ─── DELETE /api/tasks/:id 

router.delete('/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    res.json({ message: 'Task deleted successfully.', id: Number(id) });
  } catch (err) {
    console.error('[DELETE /tasks/:id]', err.message);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;