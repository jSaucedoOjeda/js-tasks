//Form submit
document.getElementById('formTask').addEventListener('submit', saveTask);

//Save task in LocalStorage
function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,
        description
    };

    if(localStorage.getItem('tasks') === null){
        //Array of tasks, if there are no tasks, we create the array
        let tasks = [];
        tasks.push(task);
        //Object to string
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        //String to object, if there are tasks
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    //Update list
    getTasks();
    //Clean form
    document.getElementById('formTask').reset();
    //Prevent default
    e.preventDefault();
}

//Function to update list tasks
function getTasks(){
    //Get all the tasks in localStore
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //Fill the div tasks
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        tasksView.innerHTML += `
        <div class="card mb-4">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">
                    Delete
                </a>
            </div>
        </div>
        `;
    }
}

//Delete tasks with parameter title from the anchor button
function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //For statement to verify if the actual title it's on the list
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1);
        }

    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();


}

getTasks();