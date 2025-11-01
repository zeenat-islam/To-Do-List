let inputbox = document.getElementById("task");
let addbtn = document.getElementById("add");
let tasklist = document.getElementById("todolist");
const year = document.getElementById("year");


year.innerText = new Date().getFullYear();



document.addEventListener("DOMContentLoaded", function() {
    getLocalTodos();
    const year = document.getElementById("year");
    year.innerText = new Date().getFullYear();
});


let editTodo = null;
const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (inputText.length <= 0) {
        alert("Enter your task here");
        return false;
    }
    if (inputText.length <= 3) {
        alert("please enter correct task");
        inputbox.value = "";
        return false;
    }

    if (editTodo !== null) {
        const oldText = editTodo.querySelector("p").innerText;
        editTodo.querySelector("p").innerText = inputText;
        editLocalTodo(oldText, inputText);
        addbtn.innerText = "Add";
        inputbox.value = "";
        editTodo = null;
        return;
    }
                           


        const li = document.createElement("li");
        const p = document.createElement("p");

        p.innerHTML = inputText;
        li.appendChild(p);

        //creating edit button
        const editbtn = document.createElement("button");
        editbtn.innerText = "Edit";
        editbtn.classList.add("editbtn", "btn");
        li.appendChild(editbtn);


        //creating edit button

        const editicon = document.createElement("i");
        editicon.classList.add("fa-regular", "fa-plus");
        editbtn.append(editicon);



        //creating button delete
        const deletebtn = document.createElement("button");
        deletebtn.innerText = "Remove";
        deletebtn.classList.add("deletebtn", "btn");
        li.appendChild(deletebtn);


        //adding icon for delete button
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");
        deletebtn.append(icon);



        tasklist.appendChild(li);
        inputbox.value = "";

        saveLocalTodos(inputText);
 }


const updateTodo = (e) => {


    // console.log(e.target.innerHTML);
    if (e.target.innerText === "Remove") {
       // console.log(e.target.parentElement);
        tasklist.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }

    if (e.target.innerText === "Edit") {
        //console.log("Edit click");
        inputbox.value = e.target.parentElement.querySelector("p").innerText;
         inputbox.focus();
        addbtn.innerText = "Edit";
        editTodo = e.target.parentElement;


    }
}


const saveLocalTodos=(todo)=>{
    let todos;

    if(localStorage.getItem("todos")=== null)
    {
        todos =[];
    }else{
         todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
   // console.log(todos);

 
}

const getLocalTodos = ()=>{

    let todos;

    if(localStorage.getItem("todos")=== null)
    {
        todos =[];
    }else{
         todos = JSON.parse(localStorage.getItem("todos"));
         todos.forEach(todo => {

            const li = document.createElement("li");
            const p = document.createElement("p");
    
            p.innerHTML = todo;
            li.appendChild(p);
    
            //creating edit button
            const editbtn = document.createElement("button");
            editbtn.innerText = "Edit";
            editbtn.classList.add("editbtn", "btn");
            li.appendChild(editbtn);
    
    
            //creating edit button
    
            const editicon = document.createElement("i");
            editicon.classList.add("fa-regular", "fa-plus");
            editbtn.append(editicon);
    
    
    
            //creating button delete
            const deletebtn = document.createElement("button");
            deletebtn.innerText = "Remove";
            deletebtn.classList.add("deletebtn", "btn");
            li.appendChild(deletebtn);
    
    
            //adding icon for delete button
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-trash-can");
            deletebtn.append(icon);
    
    
    
            tasklist.appendChild(li);
            
         });
    }

}

const deleteLocalTodo = (todo)=>{
    let todos;

    if(localStorage.getItem("todos")=== null)
    {
        todos =[];
    }else{
         todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos))
    //console.log(todoIndex);
   // console.log(todoText.children[0].innerHTML);

}

const editLocalTodo = (oldText, newText) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(oldText);
    todos[todoIndex] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", getLocalTodos)
addbtn.addEventListener('click', addTodo);
tasklist.addEventListener('click', updateTodo);

