
//----------***Métodos de um objeto no Array:***----------

// push: Adicionar novo item no array
// filter: Cria um novo array mantendo só os itens que passam numa condição
// map: Cria um novo array modificando os itens, sem alterar o original
// splice: Serve pra remover ou substituir coisas dentro do array
// includes(): Para saber se um valor existe dentro de um array

// --------------------------------------------------------


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
    // .trim() serve para tirar os espaçamentos em branco do começo e no final da string
    if (!text) return alert("Digite algo para incluir.");

    tasks.push({
    // push serve para adicionar um novo item dentro de um array
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
