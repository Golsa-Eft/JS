const taskInput = document.getElementById("task-input")
const dateInput = document.getElementById("date-input")
const addButton = document.getElementById("add-button")
const alertMessage = document.getElementById("alert-message")
const todosBody = document.querySelector("tbody");


const todos = JSON.parse(localStorage.getItem("todos")) || [];
const generateId = () =>{
    return Math.round(
        Math.random() * Math.random() * Math.pow(10, 15)
    ).toString();;
}
const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p")
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}
const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

//show in table function
const displayTodos = () =>{
    todosBody.innerHTML = '';
    if (todos.length === 0){
        todosBody.innerHTML = "<tr><td colspan='4'> No Tasks Found!</td></tr>";
        console.log("in the block: "+todosBody)
    }
    todos.forEach(todo => {
        todosBody.innerHTML += `
    <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No date"}</td>
            <td>${todo.completed? "Completed" : " Pending"}</td>
            <td>
                <button>Edit</button>
                <button>Do</button>
                <button onclick="deleteItem()">Delete</button>
            </td>
        </tr>
    `;
    });
};
const deleteItem = () => {
    console.log("click delete item!");
}

const addHandler = ()=> {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        id: generateId(),
        completed: false,
        task, //if our key and value have same name we can write just task instead of task: task
        date,
    };
    if (task){
        todos.push(todo);
        saveToLocalStorage();
        displayTodos();
        taskInput.value = "";
        dateInput.value = "";
        console.log(todos);
         showAlert("Todo added successfully", "success")
    } else {
        showAlert("Please enter a todo!", "error")
    }
}

addButton.addEventListener("click", addHandler);

displayTodos();
