const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// Helper function to load the db.json data
const loadData = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

// Helper function to save data back to db.json
const saveData = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Get table data (movies, showing, etc.)
app.get('/:table', (req, res) => {
  const { table } = req.params;
  const data = loadData();
  if (data[table]) {
    res.json(data[table]);
  } else {
    res.status(404).json({ error: `Table ${table} not found` });
  }
});

// Get specific item by ID from a table
app.get('/:table/:id', (req, res) => {
  const { table, id } = req.params;
  const data = loadData();
  
  if (!data[table]) {
    return res.status(404).json({ error: `Table ${table} not found` });
  }

  const item = data[table].find(item => item.id.toString() === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: `Item with ID ${id} not found in ${table}` });
  }
});

// Add to table (movies, showing, etc.)
app.post('/:table', (req, res) => {
  const { table } = req.params;
  const newItem = req.body;
  const data = loadData();

  if (!data[table]) {
    return res.status(404).json({ error: `Table ${table} not found` });
  }

  newItem.id = Date.now(); // Assign a unique ID based on timestamp
  data[table].push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

// Edit an item in the table
app.put('/:table/:id', (req, res) => {
  const { table, id } = req.params;
  const updatedItem = req.body;
  const data = loadData();

  if (!data[table]) {
    return res.status(404).json({ error: `Table ${table} not found` });
  }

  const index = data[table].findIndex((item) => item.id.toString() === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with ID ${id} not found in ${table}` });
  }

  data[table][index] = { ...data[table][index], ...updatedItem };
  saveData(data);
  res.json(data[table][index]);
});

// Delete an item in the table
app.delete('/:table/:id', (req, res) => {
  const { table, id } = req.params;
  const data = loadData();

  if (!data[table]) {
    return res.status(404).json({ error: `Table ${table} not found` });
  }

  const index = data[table].findIndex((item) => item.id.toString() === id);
  if (index === -1) {
    return res.status(404).json({ error: `Item with ID ${id} not found in ${table}` });
  }

  const deletedItem = data[table].splice(index, 1)[0];
  saveData(data);
  res.json(deletedItem);
});

app.post('/update-db', (req, res) => {
  const updatedData = req.body; // The new data you want to store in db.json
  saveData(updatedData); // Save it to db.json
  res.status(200).json({ message: 'Database updated successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
