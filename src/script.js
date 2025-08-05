document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("inputNewTask");
    const button = document.getElementById("includeTask");
    const list = document.getElementById("to-do-list");

    // Carrega tarefas do localStorage ao iniciar
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });

    // Clique no botão "Include Task"
    button.addEventListener("click", function () {
        const taskText = input.value.trim();

        if (taskText === "") {
            alert("Digite alguma tarefa!");
            return;
        }

        addTaskToDOM(taskText);
        saveTask(taskText);

        input.value = "";
        input.focus();
    });

    // Função para adicionar tarefa no DOM
    function addTaskToDOM(taskText) {
        const li = document.createElement("li");
        li.className = "taskItem";
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">Excluir</button>
        `;

        // Botão de excluir
        li.querySelector(".deleteBtn").addEventListener("click", function () {
            li.remove();
            removeTask(taskText);
        });

        list.appendChild(li);
    }

    // Salva tarefa no localStorage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove tarefa do localStorage
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
