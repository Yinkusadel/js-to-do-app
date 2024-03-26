import { customAlphabet } from 'nanoid/non-secure';

const nanoid = customAlphabet('1234567890abcdef', 10);

const store = () => {
  let todos = [];

  const getLocalStorageTodos = () => {
    return JSON.parse(localStorage.getItem('yukusadel-js-todo-app-todos')) || [];
  };

  const updateLocalStorageTodos = () => {
    localStorage.setItem('yukusadel-js-todo-app-todos', JSON.stringify(todos));
  };

  const getAll = (userId) => todos.filter(({ todoUserId }) => todoUserId === userId);
  const toggleComplete = (userId, todoId) => {
    const currentIndex = todos.findIndex(
      ({ todoUserId, id }) => todoUserId === userId && id === todoId,
    );
    if (todos[currentIndex].completed) {
      todos[currentIndex].completed_at = null;
    } else {
      todos[currentIndex].completed_at = new Date().toISOString();
    }
    todos[currentIndex].completed = !todos[currentIndex].completed;
    updateLocalStorageTodos();
  };
  const deleteTodo = (userId, todoId) => {
    todos = todos.filter(({ todoUserId, id }) => todoUserId === userId && id !== todoId);

    todos = todos.map((todo, index) => ({
      ...todo,
      priority: index + 1,
    }));

    updateLocalStorageTodos();
  };

  const addTodo = (userId, task, completed) => {
    const todo = {
      id: nanoid(),
      task,
      priority: todos.length + 1,
      completed,
      todoUserId: userId,
      created_at: new Date().toISOString(),
      modified_at: null,
      completed_at: completed ? new Date().toISOString() : null,
    };
    todos.push(todo);
    updateLocalStorageTodos();
  };

  const updateTodoOrder = (userId) => {
    const userTodos = todos.filter(({ todoUserId }) => todoUserId === userId);
    const updatedTodos = userTodos.map((todo, index) => ({
      ...todo,
      priority: index + 1,
    }));
    todos = todos.map(
      (todo) => updatedTodos.find((updatedTodo) => updatedTodo.id === todo.id) || todo,
    );
  };

  todos = getLocalStorageTodos();

  return {
    getAll,
    toggleComplete,
    deleteTodo,
    addTodo,
    updateTodoOrder,
  };
};

export default store;
