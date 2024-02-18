const store = (function setStore() {
  const localStorageKey = 'todos';

  const getLocalStorage = () => {
    const storedData = localStorage.getItem(localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  return {
    getAllTodos() {
      return getLocalStorage();
    },
    addTodo(todo) {
      const todos = getLocalStorage();
      todos.push(todo);
      updateLocalStorage(todos);
    },
  };
})();

export default store();
