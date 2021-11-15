//  SELECTORS 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");


// EVENT LISTENERS
document.addEventListener("DOMContentLoaded",getTodos); 
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener("click",filterTodo)

// Functions

function addToDo(e){
    e.preventDefault()
    //Todo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to localStorage
    saveLocalTodos(todoInput.value);

    // checkmark btn
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class = "fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // trash btn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // append 
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
        
    }
    // check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

console.log("Todo renders");

function filterTodo(e){
    const todos = todoList.childNodes;
    
    for(let i = 1;i < todos.length;i ++){
        console.log(todos[i].classList,e.target.value );
        switch(e.target.value){
            case "all":
                todos[i].style.display = 'flex';
                break;
            case "completed":
                if(todos[i].classList.contains("completed")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }
                break;
            case "unCompleted":
                if(!todos[i].classList.contains("completed")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }
                break;
        }
    }
    
}

function saveLocalTodos(todo) {
    // check --hey do i have already have thing in there ?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo');
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // add todo to localStorage
        
    
        // checkmark btn
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class = "fas fa-check"></i>';
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);
        // trash btn
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);
        // append 
        todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}