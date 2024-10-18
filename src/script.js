
const localStorageNameKey = "to-do-list"

function newTask(){
    let input = document.getElementById("inputNewTask");
    
    //validação
    if(input.value){
        alert("Digite algo para ser inserido na lista.")
    }
    // else if()
    else{
    //increment to LocalStorage
    let values = JSON.parse(localStorage.getItem("to-do-list")) || "[]"
    values.push({
        name: input.value
    });
    localStorage.setItem(localStorageNameKey, JSON.stringify(values));
    }

}
