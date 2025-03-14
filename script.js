const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value;
  if (todoText.length > 0) {
    allTodos.push(todoText);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoList.innerHTML = "";
  allTodos.forEach((val, idx) => {
    const todoItem = createTodoItem(val, idx);
    todoList.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoItem = document.createElement("li");
  todoItem.className = "todo";
  todoItem.innerHTML = `
        <input type="checkbox" id="${todoId}" />
        <label for="${todoId}" class="custom-checkbox">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="transparent"
            >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todo}
        </label>
        <button class="delete-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--secondary-color)"
            >
                <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
            </svg>
        </button>
        `;

  const deleteButton = todoItem.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  return todoItem;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, idx) => idx !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
