const inp = document.querySelector('#add-input');
const addBtn = document.querySelector('.add');
const taskList = document.querySelector('.task-list');
showTasks();

addEventListener('dblclick', saveEdit);
addBtn.addEventListener('click', addTodo);
inp.addEventListener('keypress', function (e) {
    if (e.key == "Enter") {
        addTodo();
    }
});



function addTodo(e) {
    if (inp.value != '') {
        let oldTasks = readLocalStorage();
        let newTask = creatObject(oldTasks.length);

        oldTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(oldTasks));
        showTasks();

        inp.value = '';
        inp.focus();

    } else {
        alert('Enter your Task');
    }
}

function creatObject(arrayLength) {
    let date = new Date();

    const newObject = {
        id: arrayLength + 1,
        text: inp.value,
        time: date.toLocaleDateString(),
        done: false
    };
    return newObject;
}

function readLocalStorage() {
    let customArrey = JSON.parse(localStorage.getItem('tasks'));
    let oldTasksLength;

    if (customArrey) {
        oldTasksLength = customArrey.length;
    } else {
        oldTasksLength = 0;
        customArrey = [];
    }

    return customArrey;
}

function showTasks() {
    let tasks = readLocalStorage();

    taskList.innerHTML = '';

    tasks.map(item => {

        let checked = '';
        let line = '';

        if (item.done == true) {
            checked = 'checked';
            line = 'text-decoration-line-through'
        }

        taskList.innerHTML += `<div class="row justify-content-between py-2 border-bottom">
                        <div class="col-9 d-flex">
                        <input type="checkbox" id="" data-id="${item.id}" ${checked}>
                        <p class="m-0 mx-2 ${line}" data-id="${item.id}"> ${item.text}</p>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                        <span class="material-symbols-outlined fs-6" id="icon1">
                        edit
                        </span>
                        <span class="material-symbols-outlined fs-6" id="icon2">
                        close
                        </span>
                        </div>
                    </div>`;
    });
    let checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    let editBtns = taskList.querySelectorAll('span#icon1');
    let deletes = taskList.querySelectorAll('span#icon2');



    checkboxes.forEach(item => {
        item.addEventListener('click', chengeTaskStatus);


    })
    editBtns.forEach(item => {
        item.addEventListener('click', showEditInput);
        

    })
    deletes.forEach(item => {
        item.addEventListener('click', deleteTasks);
    })
}

function deleteTasks() {
    let taskId = this.parentElement.parentElement.querySelector('input[type="checkbox"]').dataset.id;
    this.parentElement.parentElement.remove();

    let tasks = readLocalStorage();
    tasks = tasks.filter(item => item.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks(); 
}

function chengeTaskStatus() {
    let tasks = readLocalStorage();
    tasks.forEach(item => {
        if (item.id == this.dataset.id) {
            item.done = !item.done;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}
function showEditInput(){
    let p =this.parentElement.parentElement.children[0].children[1];

    let editInp = document.createElement('input');
    editInp.setAttribute('type','text');
    editInp.setAttribute('value',p.innerHTML);
    editInp.setAttribute('data-id', p.dataset.id);
    editInp.className="form-control";

    p.remove();
    this.parentElement.parentElement.children[0].appendChild(editInp);
}

function saveEdit(){
    let findInp = taskList.querySelector('input[type="text"]');
    let p = document.createElement('p');
    p.className ='m-0 mx-2';
    p.setAttribute('data-id', findInp.dataset.id); 
    let text = document.createTextNode(findInp.value);

    p.appendChild(text);

    findInp.parentElement.replaceChild(p,findInp.parentElement.children[1]);

    let tasks = readLocalStorage();
    tasks.forEach(item => {
        if (item.id == findInp.dataset.id) {
            item.text = findInp.value;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();

}




