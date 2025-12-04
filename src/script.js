const taskInput = document.getElementById("taskInput");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const btnTheme = document.getElementById("btnTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

render();

// SALVAR NO LOCALSTORAGE
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADICIONAR TASK
btnAdd.onclick = () => {
    const text = taskInput.value.trim();
    if (!text) return alert("Escreve a porra da task, cavalo.");

    tasks.push({
        text,
        done: false
    });

    save();
    render();
    taskInput.value = "";
};

// RENDERIZAR TAREFAS
function render() {
    taskList.innerHTML = "";

    let filtered = tasks;

    if (filter.value === "done")
        filtered = tasks.filter(t => t.done);

    if (filter.value === "pending")
        filtered = tasks.filter(t => !t.done);

    filtered.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task" + (task.done ? " done" : "");

        div.innerHTML = `
            <span contenteditable="true" class="edit">${task.text}</span>

            <div class="icons">
                <button class="btnDone"><i class="fa-solid fa-check"></i></button>
                <button class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        // MARCAR COMO CONCLUÍDA
        div.querySelector(".btnDone").onclick = () => {
            task.done = !task.done;
            save();
            render();
        };

        // EXCLUIR
        div.querySelector(".btnDelete").onclick = () => {
            tasks.splice(index, 1);
            save();
            render();
        };

        // EDITAR
        div.querySelector(".edit").onblur = (e) => {
            task.text = e.target.innerText;
            save();
        };

        taskList.appendChild(div);
    });
}

// FILTRO
filter.onchange = () => render();

// TEMA DARK/LIGHT
btnTheme.onclick = () => {
    document.body.classList.toggle("light");
};
