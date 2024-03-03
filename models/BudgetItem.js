const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  relatedValue: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#([0-9a-fA-F]{6})$/,
    minlength: 7,
    max_length: 7
  }
});

const BudgetItem = mongoose.model('BudgetItem', budgetItemSchema);

module.exports = BudgetItem;
