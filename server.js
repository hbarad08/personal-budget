const mongoose = require('mongoose');
const express = require('express');
const BudgetItem = require('./models/BudgetItem');
const fs = require('fs');
const app = express(); 
const port = 3000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal-budget', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

app.use('/', express.static('public'));

const budgetData = JSON.parse(fs.readFileSync('budget-data.json', 'utf-8'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budgetData); 
});

app.get('/budget', async (req, res) => {
    try {
      const budgetItems = await BudgetItem.find();
      res.json(budgetItems);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/budget', async (req, res) => {
    try {
      const { title, relatedValue, color } = req.body;
      const newBudgetItem = new BudgetItem({ title, relatedValue, color });
      await newBudgetItem.save();
      res.status(201).json(newBudgetItem);
    } catch (error) {
      console.error('Error adding new budget item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
