const jwt = require("jsonwebtoken");
const helpers = require("../../utils/helpers");
const { Todo } = require("./models");

async function postTodo(req, res) {
  try {
    const { task } = req.body;

    const user = res.locals.user;
    const todo = await Todo.create({ task, user: user._id });

    return res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function getTodos(req, res) {
  try {
    let { limit = "10", page = "1", search = "" } = req.query;
    limit = +limit;
    page = +page;

    const user = res.locals.user;
    const query = { user: user._id };
    if (search) {
      query.task = RegExp(search, "i");
    }
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Todo.countDocuments(query);

    return res.status(200).json({ todos, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function getTodo(req, res) {
  try {
    const id = req.params.id;
    const user = res.locals.user;
    const todo = await Todo.findOne({ _id: id, user: user._id });
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }
    return res.json({ todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function patchTodo(req, res) {
  try {
    const { task, done } = req.body;
    const id = req.params.id;
    const user = res.locals.user;
    const todo = await Todo.findOne({ _id: id, user: user._id });
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }
    todo.task = task ?? todo.task;
    todo.done = done ?? todo.done;
    await todo.save();

    return res.json({ message: "todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const user = res.locals.user;
    const todo = await Todo.findOne({ _id: id, user: user._id });
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }
    await todo.deleteOne();
    return res.json({ message: "todo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

const validations = {
  postTodo,
  patchTodo,
  getTodo,
  getTodos,
  deleteTodo,
};

module.exports = validations;
