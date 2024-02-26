import { nanoid } from 'nanoid';

const store = () => {
  let todos = [];

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
  };
  const deleteTodo = (userId, todoId) => {
    todos = todos.filter(({ todoUserId, id }) => todoUserId === userId && id !== todoId);
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
  };

  //   const getLocalStorageTodos = () => {
  //     return JSON.parse(localStorage.getItem('todos')) || [];
  //   };

  //   const updateLocalStorageTodos = (updatedTodos) => {
  //     localStorage.setItem('todos', JSON.stringify(updatedTodos));
  //   };

  return {
    getAll,
    toggleComplete,
    deleteTodo,
    addTodo,
  };
};

export default store;
