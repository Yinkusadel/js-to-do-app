import auth from './auth';

const todos = [];

const userIdCharacters =
  '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&.*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const toggleCompleted = (index, refreshTodo) => {
  todos[index].completed = !todos[index].completed;
  if (todos[index].completed) {
    todos[index].completed_at = new Date().toString();
  } else {
    todos[index].completed_at = null;
  }
  refreshTodo();
};

const renderTodos = () => {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    const creationDate = new Date(todo.created_at).toLocaleString();

    li.innerHTML = `
          <li class="flex w-full cursor-pointer items-center justify-between rounded-t-lg border-b-2 bg-blue-0 p-4 outline-none">
              <div class="flex max-w-[90%] items-center gap-4">
                  <input
                      type="checkbox"
                      name="input name"
                      title="toggle first task"
                      class="peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-blue-200 from-blue-700 to-blue-800 text-blue-0 before:absolute before:left-1 before:top-0.5 checked:border-none checked:bg-gradient-to-br checked:bg-cover checked:bg-no-repeat checked:before:content-[\\u2713]" 
                      id="checkbox_${todo.id}"
                      aria-label="first task"
                      ${todo.completed ? 'checked' : ''}
                  />
                  <label
                      class="max-w-[85%] cursor-pointer rounded p-1 font-bold text-blue-400 peer-checked:text-blue-300 peer-checked:line-through"
                      for="checkbox_${todo.id}"
                  >
                  ${todo.task} Created at: ${creationDate}
                  </label>
              </div>
              <div>
                  <button title="remove task btn" type="button" aria-label="remove task">
                      <img
                          src="./src/images/icon-cross.svg"
                          title="cancel-svg"
                          class="h-3 w-3 duration-300 hover:scale-150"
                          id="deletetodo_${index}"
                      />
                  </button>
              </div>
          </li>
          `;
    todoList.appendChild(li);

    const checkbox = document.getElementById(`checkbox_${todo.id}`);
    checkbox.addEventListener('change', () => {
      toggleCompleted(index, renderTodos);
    });
  });
};

const generateRandomUserId = () => {
  const UserIdLength = 10;
  let UserId = '';
  for (let i = 0; i < UserIdLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * userIdCharacters.length);
    UserId += userIdCharacters.charAt(randomNumber);
  }
  return UserId;
};

const addTodo = (event) => {
  event.preventDefault();
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();

  if (todoText.length > 255) {
    return;
  }

  if (todoText !== '') {
    const todo = {
      id: generateRandomUserId(),
      task: todoText,
      priority: 1,
      completed: false,
      user_id: auth.getSession(),
      created_at: new Date().toISOString(),
      modified_at: null,
      completed_at: null,
    };
    todos.push(todo);
    renderTodos();
    todoInput.value = '';
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  renderTodos();
};

document.getElementById('todoform').addEventListener('submit', addTodo);

document.getElementById('todoList').addEventListener('click', (event) => {
  if (event.target && event.target.id.startsWith('deletetodo')) {
    const index = event.target.id.split('_')[1];
    deleteTodo(index);
  }
});

renderTodos();
