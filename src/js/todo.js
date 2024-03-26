import { formatDistance } from 'date-fns';
import auth from './auth';
import store from './store';
import DragAndDrop from './dragdrop';

const errorContainer = document.getElementById('email-error');

const todoStore = store();
const todoDragAndDrop = DragAndDrop();

const toggleCompleted = (todoId, refreshTodo) => {
  const { userId } = auth.getSession();
  todoStore.toggleComplete(userId, todoId);
  refreshTodo();
};

const renderTodo = (todo) => {
  const li = document.createElement('li');
  li.className =
    'todo-item flex w-full cursor-pointer items-center justify-between rounded-t-lg border-b-2 bg-blue-0 p-4 outline-none';
  li.draggable = true;
  li.id = `todo_${todo.id}`;

  const createdAtHuman = formatDistance(todo.created_at, new Date(), { addSuffix: true });
  const completedAtHuman = todo.completed_at
    ? formatDistance(todo.completed_at, new Date(), { addSuffix: true })
    : '';

  li.innerHTML = `
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
        class="flex flex-col max-w-[85%] cursor-pointer rounded p-1 font-bold text-blue-400 peer-checked:text-blue-300 peer-checked:line-through"
        for="checkbox_${todo.id}"
      >
        <div class="todo-task break-words">${todo.task}</div> 
        <small class="self-end pt-10">${
          todo.completed ? `completed ${completedAtHuman}` : `added ${createdAtHuman}`
        }</small>
      </label>
    </div>
    <div>
      <button title="remove task btn" type="button" aria-label="remove task">
        <img
          src="./icon-cross.svg"
          title="cancel-svg"
          class="h-3 w-3 duration-300 hover:scale-150"
          id="deletetodo_${todo.id}"
        />
      </button>
    </div>
  `;

  return li;
};

const renderTodos = () => {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  const { userId } = auth.getSession();
  const todos = todoStore.getAll(userId);
  todos.forEach((todo) => {
    const todoItem = renderTodo(todo);

    todoList.insertBefore(todoItem, todoList.firstChild);

    const checkbox = document.getElementById(`checkbox_${todo.id}`);
    checkbox.addEventListener('change', () => {
      toggleCompleted(todo.id, renderTodos);
    });
  });

  todoList.addEventListener('dragstart', todoDragAndDrop.handleDragStart);
  todoList.addEventListener('dragover', todoDragAndDrop.handleDragOver);
  todoList.addEventListener('dragend', todoDragAndDrop.handleDragEnd);

  document.querySelector('#todo-count').textContent =
    todos.length > 1 ? `${todos.length} items` : `${todos.length} item`;
};

const checkSession = (type = '') => {
  const session = auth.getSession();
  if (!session) {
    const loginPopup = document.getElementById('login-popup');
    loginPopup.classList.replace('hidden', 'flex');
    let errorMessage = 'when not logged in, Please login with your email address.';
    switch (type) {
      case 'addTodo':
        errorMessage = `You can't add a new todo ${errorMessage}`;
        break;

      case 'deleteTodo':
        errorMessage = `You can't add a new todo ${errorMessage}`;
        break;

      case 'toggleTodo':
        errorMessage = `You can't add a new todo ${errorMessage}`;
        break;

      default:
        errorMessage = `You can't work with todo ${errorMessage}`;
        break;
    }
    errorContainer.textContent = errorMessage;
    return null;
  }
  return session;
};

const addTodo = (event) => {
  event.preventDefault();
  const todoTask = document.querySelector('input[name=todo-task]').value.trim();
  const todoCompleted = document.querySelector('input[name=todo-complete]').checked;

  if (todoTask.length > 255) {
    return;
  }

  if (todoTask !== '') {
    const currentSession = checkSession('addTodo');
    if (currentSession) {
      const { userId } = currentSession;

      todoStore.addTodo(userId, todoTask, todoCompleted);
      renderTodos();
      event.target.reset();
    }
  }
};

const deleteTodo = (todoId) => {
  const { userId } = auth.getSession();
  todoStore.deleteTodo(userId, todoId);

  renderTodos();
};

const startUpTodo = () => {
  document.getElementById('todoform').addEventListener('submit', addTodo);

  document.getElementById('todoList').addEventListener('click', (event) => {
    if (event.target && event.target.id.startsWith('deletetodo')) {
      const todoId = event.target.id.split('_')[1];
      deleteTodo(todoId);
    }
  });

  renderTodos();
};

export default startUpTodo;
