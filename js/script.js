document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input"),
          addButton = document.getElementById("add-button"),
          incompleteList = document.getElementById("incomplete-list"),
          completeList = document.getElementById("complete-list"),
          clearButton = document.getElementById("clear-button");

    // Загрузка данных из localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    //сохранения данных в localStorage
    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    //отображения текущего списка задач
    const renderTodos = () => {
        incompleteList.innerHTML = "";
        completeList.innerHTML = "";

        //создание элементов для задач
        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");
            listItem.className = todo.completed ? "completed" : "";

            //чекбокс
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });
            //текст задачи
            const textSpan = document.createElement("span");
            textSpan.textContent = todo.text;

            //кнопка удаления задачи
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            //добавление элементов в задачу
            listItem.appendChild(checkbox);
            listItem.appendChild(textSpan);
            listItem.appendChild(deleteButton);

            //добавление задачи в зависимости от todo.completed
            if (todo.completed) {
                completeList.appendChild(listItem);
            } else {
                incompleteList.appendChild(listItem);
            }
        });
    };

    //добавления новой задачи
    addButton.addEventListener("click", () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = ""; 
        }
    });

    //очистка всех задач по клику
    clearButton.addEventListener("click", () => {
        todos = []; 
        saveTodos();
        renderTodos();
    });

    renderTodos();
});
