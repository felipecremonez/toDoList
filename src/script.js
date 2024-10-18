
const localStorageNameKey = "to-do-list"

function newTask(){
    let input = document.getElementById("inputNewTask");
    
    //validação
    if( !input.value){
        alert("Digite algo para ser inserido na lista.")
    }
    // else if()
    else{
    //increment to LocalStorage
    let values = JSON.parse(localStorage.getItem("to-do-list")) || []
    values.push({
        name: input.value
    });
    localStorage.setItem(localStorageNameKey, JSON.stringify(values))
    showValues()
    }



}

function showValues(){
    let values = JSON.parse(localStorage.getItem("to-do-list")) || []
    let list = document.getElementById("to-do-list")
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']} <button id='btn-ok' onclick='removeItem("${values[i].name}")'>Ok</button><li>`
    }

}


function removeItem(data){
    let values = JSON.parse(localStorage.getItem("to-do-list")) || []
    let index = values.findIndex( x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageNameKey, JSON.stringify(values))
    showValues()
}

showValues()

