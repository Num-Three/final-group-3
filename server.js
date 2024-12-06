const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

const DATA_FILE = path.join(__dirname, 'src', 'db.json'); // Path to db.json

app.use(cors());
app.use(express.json());

// Update or delete the data
app.post('/api/:category', (req, res) => {
  const category = req.params.category;
  const updatedData = req.body;

  console.log(`Received request to update category: ${category}`);
  console.log('Updated Data:', updatedData);  // Log the data being sent to the server

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).send("Error reading data");
    }
    
    const jsonData = JSON.parse(data);
    console.log('Current DB:', jsonData);  // Log the current state of db.json

    // Ensure the category exists in the JSON data
    if (!jsonData[category]) {
      return res.status(404).json({ error: `Category '${category}' not found` });
    }

    // Update the specific category in the JSON
    jsonData[category] = updatedData;

    // Write the updated data back to db.json
    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error saving data:', err);
        return res.status(500).send("Error saving data");
      }
      console.log('Data saved successfully!');
      res.json({ message: `${category} updated successfully` });
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
