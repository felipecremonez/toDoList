// script.js

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("inputNewTask");
    const button = document.getElementById("includeTask");
    const list = document.getElementById("to-do-list");

    button.addEventListener("click", newTask);

    function newTask() {
        const taskText = input.value.trim();

        if (taskText === "") {
            alert("Digite alguma tarefa!");
            return;
        }

        // Criando o elemento da tarefa
        const li = document.createElement("li");
        li.className = "taskItem";
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">Excluir</button>
        `;

        list.appendChild(li);
        input.value = "";
        input.focus();

        // Botão de excluir funcional
        li.querySelector(".deleteBtn").addEventListener("click", function () {
            li.remove();
        });
    }
});
