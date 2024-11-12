// todoControlllers.js

const Todo = require('../models/todoModel');

//create new todo

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
          task: req.body.task,
        });
    await todo.save();
    res.status(201).json(todo);
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
};

// Get all todos
exports.getTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update a todo (mark as completed)
  exports.updateTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!todo) return res.status(404).json({ message: 'Todo not found' });
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a todo
  exports.deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) return res.status(404).json({ message: 'Todo not found' });
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };