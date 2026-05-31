const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countDisplay = document.querySelector("#todoCount");
const filters = document.querySelector("#filters");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

function render() {
    list.innerHTML = ""; 
    
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id; 

        const span = document.createElement("span");
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    countDisplay.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false });
    input.value = "";
    saveTodos();
});

list.addEventListener("click", (e) => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.className === "delete-btn") {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        return;
    }

    if (e.target.tagName === "SPAN" || e.target.tagName === "LI") {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveTodos();
    }
});

filters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// CLEAR COMPLETED
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
});

render();